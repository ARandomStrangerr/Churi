const EXPRESS = require("express");
const DATABASE = require("../database/MongooseControl");
const MULTER = require("multer");
const FILE_SYSTEM = require("fs");
const PATH = require("path");

const ROUTER = EXPRESS.Router();
const UPLOAD = MULTER({dest: "./image-folder/unpublished-product"});

ROUTER.use(EXPRESS.static("../image-folder/unpublished-product"));
ROUTER.use(EXPRESS.static("../image-folder/published-product"));

ROUTER.get("/get-user-list", isAdmin,getUserList);
ROUTER.delete("/delete-user/:id", isAdmin, deleteUser);
ROUTER.get("/get-product-list", isAdminOrVendor, getProducts);
ROUTER.post("/create-product", isAuthorized, isAdminOrVendor, UPLOAD.array("uploadFile"), createProduct);
ROUTER.get("/get-product/:id", isAuthorized, getProduct);
ROUTER.patch("/update-product/:id", isAuthorized, UPLOAD.array("uploadFile"), updateProduct);
ROUTER.patch("/update-product-publication/:id", updateProductPublication);
ROUTER.delete("/delete-product/:id", deleteProduct);
ROUTER.get("/get-image/:productId/:id", isAdminOrVendor, getImage);
ROUTER.patch("/update-user-role/:id", isAuthorized, isAdmin, updateUserRole);
ROUTER.post("/create-event", isAuthorized, createEvent);
ROUTER.get("/get-employee-list", getEmployeeList);

 /**
 * check if the session accessing this route is registered
 * @param {*} request object
 * @param {*} response object
 * @param {*} next call the next function from the Chain of Responsibility
 */
function isAuthorized(request, response, next){
  if (request.session.userId) next();
  else response.status(401).send("You must be logged in to access User Management page");
}

function isAdminOrVendor(request, response, next){
	if (request.session.role === "admin" || request.session.role === "vendor") next();
	else response.status(401).send("Your role does not have permission for this acction");
}

function isAdmin(request, response, next) {
  if (request.session.role === "admin") next();
  else response.status(403).send("You do not have the privilege to access this route");
}

async function getUserList(request, response) {
	let limit = parseInt(request.query.limit) || 10;
	let skip = parseInt(request.query.page) * limit || 0;
	let result = await DATABASE.getUserList(limit, skip);
	response.status(200).json(result);
}

async function updateUserRole(request, response) {
	if (await DATABASE.updateUser(request.params.id, null, null, null, null, request.body.newRole)) response.status(200).send("Successfully update user role");
	else response.status(400).send("Failure to update user role");
}

async function deleteUser(request, response) {
	if (await DATABASE.deleteUser(request.params.id)) response.status(200).send("Successfully remove user");
	else response.status(400).send("Cannot remove user");
}

async function getProducts(request, response) {
	let limit = parseInt(request.query.limit) || 10;
	let skip = parseInt(request.query.page) * limit || 0;
	let results = await DATABASE.getProducts(limit, skip);
	for (let result of results){
		result.ownerUsername = result.userId.username;
		result.variant = result.variant.length;
		delete result.userId;
		result.category = result.category.name;
	}
	response.status(200).json(results);
}

async function getProduct(request, response) {
	let product = await DATABASE.getProduct(request.params.id, "_id userId name description category variant","userId category variant");
	if (!product) response.status(404).send("Product not found");
	else if (product.userId != request.session.userId && request.session.role != "admin") response.status(401).send("This product does not belong to you");
	else {
		product.category = product.category.name;
		product.owner = product.userId.username;
		response.status(200).json(product);
	}
}

async function getImage(request, response) {
	let product = await DATABASE.getProduct(request.params.productId, "_id userId published", "");
	if (request.session.role != "admin" && request.session.userId != product.userId)
		response.status(403).send("You do not have the right to view this image");
	else
		response.sendFile(PATH.join(__dirname, "..", "..", "image-folder", product.published?"published-product":"unpublished-product", request.params.id));
}

async function createProduct(request, response){
	let fileNameIndex = [];
	request.files.forEach((file) => {fileNameIndex.push(file.originalname)});
	for (let variantIndex in request.body.variant) {
		request.body.variant[variantIndex] = JSON.parse(request.body.variant[variantIndex]);
		for (let fileIndex in request.body.variant[variantIndex].imageFileName) {
			request.body.variant[variantIndex].imageFileName[fileIndex] = request.files[fileNameIndex.indexOf(request.body.variant[variantIndex].imageFileName[fileIndex])].filename;
		}
		request.body.variant[variantIndex].image = request.body.variant[variantIndex].imageFileName;
	}
	if (await DATABASE.createProduct(request.session.userId, request.body.name, request.body.category, request.body.description, request.body.variant)) response.status(200).send("Successfully create the product");
	else response.status(400).send("Fail to create the product");
}

async function updateProduct(request, response) {
	let fileNameIndex = [];
	request.files.forEach((files) => { fileNameIndex.push(files.originalname) });
	for (let variantIndex in request.body.variant) {
		request.body.variant[variantIndex] = JSON.parse(request.body.variant[variantIndex]);
		for (let fileIndex in request.body.variant[variantIndex].imageFileName) {
			if (request.body.variant[variantIndex].imageFileName[fileIndex].includes("."))
				request.body.variant[variantIndex].imageFileName[fileIndex] = request.files[fileNameIndex.indexOf(request.body.variant[variantIndex].imageFileName[fileIndex])].filename;
		}
		request.body.variant[variantIndex].image = request.body.variant[variantIndex].imageFileName;
	}
	// todo delete unused image on update
	const oldObject = await DATABASE.updateProduct(request.params.id, request.body.name, null, request.body.category, request.body.description, request.body.variant);
	// move file to published folder
	if (oldObject.published)
		for (let file of request.files)
			FILE_SYSTEM.renameSync(PATH.join(__dirname, "..", "..", "image-folder", "unpublished-product", file.filename), PATH.join(__dirname, "..", "..", "image-folder", "published-product", file.filename));
	if (oldObject) response.status(200).send("Successfully update product");
	else response.status(404).send("The porduct does not exists");
}

async function updateProductPublication(request, response) {
	let productPublication = await DATABASE.getProduct(request.params.id, "published variant", "variant");
	await DATABASE.updateProduct(request.params.id, null, !productPublication.published, null, null, null);
	for (let variant of productPublication.variant)
		for (let file of variant.image)
			FILE_SYSTEM.renameSync(PATH.join(__dirname, "..", "..", "image-folder", productPublication.published?"published-product":"unpublished-product", file), PATH.join(__dirname, "..", "..", "image-folder", productPublication.published?"unpublished-product":"published-product", file));
	response.status(200).send("Successfully published the product");
}

async function deleteProduct(request, response) {
	const deletedProductData = await DATABASE.deleteProduct(request.params.id);
	console.log(deletedProductData);
	if (deletedProductData) {
		response.status(200).send("Successfully to delete the product");
		for (let imageFileName of deletedProductData.img) FILE_SYSTEM.unlinkSync(`../../product-image-folder/${imageFileName}`);
	}
	else response.status(400).send("Fail to delete the product");
}

async function createEvent(request, response) {
	DATABASE.createEvent(request.body.name, request.body.start, request.body.end, request.body.location, []);
	response.status(200).send("Successfully create schedule");
}

async function getEmployeeList(request, response) {
	let data = await DATABASE.getEmployeeList();
	for (let employee of data) {
		delete employee.email;
		delete employee.password;
		delete employee.role;
	}
	response.status(200).json(data);
}
module.exports = ROUTER;

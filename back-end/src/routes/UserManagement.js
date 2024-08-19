const ROUTER = require("express").Router();
const DATABASE = require("../database/MongooseControl");
const MULTER = require("multer");
const FILE_SYSTEM = require("fs");

const UPLOAD = MULTER({dest: "./image-folder/unpublished-product"});

ROUTER.get("/get-user-list", isAdmin,getUserList);
ROUTER.delete("/delete-user/:id", isAdmin, deleteUser);
ROUTER.get("/get-product-list", isAdminOrVendor, getProducts);
ROUTER.post("/create-product", isAuthorized, isAdminOrVendor, UPLOAD.array("uploadFile"), createProduct);
ROUTER.get("/get-product/:id", isAuthorized, getProduct);
ROUTER.patch("/update-product/:id", UPLOAD.array("uploadImageFiles"), updateProduct);
ROUTER.delete("/delete-product/:id", deleteProduct);

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
	let product = await DATABASE.getProduct(request.params.id);
	if (!product) response.status(404).send("Product not found");
	else if (product.userId != request.session.userId && request.session.role != "admin") response.status(401).send("This product does not belong to you");
	else {
		product.category = product.category.name;
		product.owner = product.userId.username;
		response.status(200).json(product);
	}
}

 /**
 * request.body should include:
 * name: name of the product
 * description: description of the product
 * prodcutImage: the list of image files of the product
 * discount: discount price
 * price: price of the product
 */
async function createProduct(request, response){
	let fileNameIndex = [];
	request.files.forEach((file) => {fileNameIndex.push(file.originalname)});
	for (let variantIndex in request.body.variant) {
		request.body.variant[variantIndex] = JSON.parse(request.body.variant[variantIndex]);
		for (let fileIndex in request.body.variant[variantIndex].imageFileName) {
			request.body.variant[variantIndex].imageFileName[fileIndex] = request.files[fileNameIndex.indexOf(request.body.variant[variantIndex].imageFileName[fileIndex])].filename;
		}
	}
	if (await DATABASE.createProduct(request.session.userId, request.body.name, request.body.category, request.body.description, request.body.variant)) response.status(200).send("Successfully create the product");
	else response.status(400).send("Fail to create the product");
}

async function updateProduct(request, response) {
	for (let file of request.files) request.body.imageName[request.body.imageName.indexOf(file.originalname)] = file.filename;
	let oldImageFileName = await DATABASE.updateProduct(request.params.id, request.body.name, request.body.imageName, request.body.desc, request.body.stock, request.body.prince, request.body.discount);
	if (oldImageFileName) {
		response.status(200).send(`Successfully update item ${request.params.id}`);
	} else {
		response.status(400).send("Cannot update the item");
	}
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
module.exports = ROUTER;

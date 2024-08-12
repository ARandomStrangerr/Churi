const ROUTER = require("express").Router();
const DATABASE = require("../database/MongooseControl");
const MULTER = require("multer");
const FILE_SYSTEM = require("fs");

const UPLOAD = MULTER({dest: "./product-image-folder"});

ROUTER.get("/get-user-list", isAdmin,getUserList);
ROUTER.get("/get-product-list", isAdminOrVendor, getProductList);
ROUTER.post("/create-product", isAdminOrVendor, UPLOAD.array("uploadImageFiles"), createProduct);
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

async function getProductList(request, response) {
	let limit = parseInt(request.query.limit) || 10;
	let skip = parseInt(request.query.page) * limit || 0;
	let results = await DATABASE.getProductsList(limit, skip);
	for (let result of results){
		result.ownerUsername = result.userId.username;
		delete result.userId;
	}
	response.status(200).json(results);
}

async function getProduct(request, response) {
	let product = await DATABASE.getProduct(request.params.id);
	if (!product) response.status(404).send("Product not found");
	else if (product.userId != request.session.userId && request.session.role != "admin") response.status(401).send("This product does not belong to you");
	else response.status(200).json(product);
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
	let imgNameList = [];
	request.files.forEach(file => imgNameList.push(file.filename));
	if (await DATABASE.createProduct(request.session.userId, request.body.name, imgNameList, request.body.desc, request.body.price, request.body.stock, request.body.discount))
		response.status(200).send("Successfully create product");
	else
		response.status(400).send("Failure to create product");
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

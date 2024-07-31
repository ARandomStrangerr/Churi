const ROUTER = require("express").Router();
const DATABASE = require("../database/MongooseControl");
const MULTER = require("multer");

const UPLOAD = MULTER({storage: MULTER.memoryStorage()});

//ROUTER.use(isAuthorized);

ROUTER.get("/get-user-list", getUserList);
ROUTER.get("/get-product-list", getProductList);
ROUTER.post("/create-product", UPLOAD.array("productImage", 10), createProduct);

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
	response.status(200).json();
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
	console.log(request.body);
	console.log(request.files);
	response.status(200).send("GOOD");
	//if (await DATABASE.createProduct(request.session.userId, request.body.name, [], 0, 0, 0,))
	//	response.status(200).send("Successfully create product");
	//else
	//	response.status(200).send("Failure to create product");
}

module.exports = ROUTER;

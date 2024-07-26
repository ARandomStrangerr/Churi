const ROUTER = require("express").Router();
const DATABASE = require("../database/MongooseControl");

ROUTER.use(isAuthorized);

ROUTER.get("/get-user-list", getUserList);
ROUTER.get("/get-product-list", getProductList);

function isAuthorized(request, response, next){
  if (request.session.userId) next();
  else response.status(401).send("You must be logged in to access User Management page");
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

module.exports = ROUTER;

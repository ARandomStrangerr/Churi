const EXPRESS = require("express");
const PATH = require("path");

const ROUTER = EXPRESS.Router();
const DATABASE = require("../database/MongooseControl");

ROUTER.use(EXPRESS.static(PATH.join(__dirname, "..", "..", "image-folder", "published-product")));

ROUTER.get("/get-product-card", getProductCard);
ROUTER.get("/get-product/:id", getSingleProduct);
ROUTER.get("/get-image/:fileName", getImage);

async function getProductCard(request, response) {
	let products = await DATABASE.getProductCard();
	for (let product of products) {
		product.image = [];
		product.price = 0;
		for (let variant of product.variant) {
			product.image.push(variant.image[0]);
			product.price = product.price > variant.price ? product.price : variant.price;
		}
		delete product.variant;
	}
	response.status(200).send(products);
}

async function getSingleProduct(request, response) {
	let product = await DATABASE.getProduct(request.params.id, "_id name category description published userId variant", "category userId variant");
	product.ownerName = product.userId.displayName;
	delete product.userId;
	product.category = product.category.name;
	if (product) {	
		response.status(200).json(product);
	} else response.status(404).send("No product is found");
}

function getImage(request, response) {
	response.sendFile(PATH.join(__dirname, "..", "..", "image-folder", "published-product", request.params.fileName));
}

module.exports = ROUTER;

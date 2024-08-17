const ROUTER = require("express").Router();
const DATABASE = require("../database/MongooseControl");

ROUTER.get("/get-product-card", getProductCard);
ROUTER.get("/get-product/:id", getSingleProduct);

async function getProductCard(request, response) {
	let cards = await DATABASE.getProductCard();
	//for (let card of cards) card.img = card.img[0];
	response.status(200).send(cards);
}

async function getSingleProduct(request, response) {
	let product = await DATABASE.getProduct(request.params.id);
	if (product) {
		
		response.status(200).json(product);
	} else response.status(404).send("No product is found");
}

module.exports = ROUTER;

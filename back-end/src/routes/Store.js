const ROUTER = require("express").Router();
const DATABASE = require("../database/MongooseControl");

ROUTER.get("/get-product-card", getProductCard);

async function getProductCard(request, response) {
	let cards = await DATABASE.getProductCard();
	for (let card of cards) card.img = card.img[0];
	response.status(200).send(cards);
}

module.exports = ROUTER;

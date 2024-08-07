const EXPRESS = require ("express");
const PATH = require("path");
const BODY_PARSER = require ("body-parser");
const CORS = require("cors");
const SESSION = require("express-session");
const AUTH_ROUTE = require ("./src/routes/Authentication");
const USER_MANAGEMENT_ROUTE = require("./src/routes/UserManagement");
const DATABASE_CONTROL = require("./src/database/MongooseControl");

const APP = EXPRESS();
const PORT = 5172;

// define middlewares
APP.use(CORS({
	origin: "http://localhost:5173",
	credentials: true
}));
APP.use(BODY_PARSER.json());
APP.use(SESSION({
	secret: "thisisnotagoodsecret",
	resave: false,
	saveUninitialized: false
	//session stores data in memory by default, more at: https://expressjs.com/en/resources/middleware/session.html
}));
APP.use(EXPRESS.static("product-image-folder"));

// define Router
APP.use("/auth", AUTH_ROUTE);
APP.use("/user-management", USER_MANAGEMENT_ROUTE);

// define global paths
APP.get("/image/products/:id", serveImage);

APP.listen(PORT, function() {
	DATABASE_CONTROL.connect("localhost", 27017, "CHURI");
  console.log(`Listening for connection at port ${PORT}`);
});

function serveImage(request, response) {
	const FILE_PATH = PATH.join(__dirname, "product-image-folder", request.params.id);
	response.sendFile(FILE_PATH);
}

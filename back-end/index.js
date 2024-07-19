const EXPRESS = require ("express");
const BODY_PARSER = require ("body-parser");
const CORS = require("cors");
const SESSION = require("express-session");
const AUTH_ROUTE = require ("./src/routes/Authentication");
const DATABASE_CONTROL = require("./src/database/MongooseControl");

const APP = EXPRESS();
const PORT = 5172;

APP.use(CORS());
APP.use(BODY_PARSER.json());
APP.use(SESSION({
	secret: "AReallyBadSecret",
	resave: false,
	saveUninitialized: false
	//session stores data in memory by default, more at: https://expressjs.com/en/resources/middleware/session.html
}));

APP.use("/auth", AUTH_ROUTE);

APP.listen(PORT, function() {
	DATABASE_CONTROL.connect("localhost", 27017, "CHURI");
	console.log(`Listening for connection at port ${PORT}`)
});

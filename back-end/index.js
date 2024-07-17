const EXPRESS = require ("express");
const BODY_PARSER = require ("body-parser");
const AUTH_ROUTE = require ("./src/routes/Authentication");
const CORS = require("cors");

const APP = EXPRESS();
const PORT = 5172;

APP.use(CORS());
APP.use(BODY_PARSER.json());

APP.use("/auth", AUTH_ROUTE);

APP.listen(PORT, function() {
	console.log(`Listening for connection at port ${PORT}`)	
});

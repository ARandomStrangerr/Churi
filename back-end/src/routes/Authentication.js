const ROUTER = require("express").Router();
const BCRYPT = require("bcryptjs");
const DATABASE = require("../database/MongooseControl");

ROUTER.post("/sign-in", SignIn);
ROUTER.post("/sign-up", SignUp);
ROUTER.post("/sign-out", SignOut);

async function SignUp(request, response){
	console.log(request.body)
	if (!request.body.username || request.body.username.length === 0 || request.body.password || request.body.password.length === 0 || !request.body.email || request.body.email.length === 0){
		console.log("empty");
		return response.status(400).json({error: "Username, Password, and Email are required"});
	}
	const salt = await BCRYPT.genSalt(10);
	const hasedPassword = await BCRYPT.hasedPassword(request.body.password, salt);
	//push user into database
}

function SignIn(request, response){

}

function SignOut(request, response){

}

module.exports = ROUTER;

const ROUTER = require("express").Router();
const BCRYPT = require("bcryptjs");
const DATABASE = require("../database/MongooseControl");

ROUTER.post("/sign-in", SignIn);
ROUTER.post("/sign-up", SignUp);
ROUTER.post("/sign-out", SignOut);

async function SignUp(request, response){
	if (!request.body.username || request.body.username.length === 0 || !request.body.password || request.body.password.length === 0 || !request.body.email || request.body.email.length === 0) {
		response.status(400).json({error: "Username, Password, and Email are required"});
		return;
	}
	const salt = await BCRYPT.genSalt(10);
	const hashedPassword = await BCRYPT.hash(request.body.password, salt);
	if (await DATABASE.signUp(request.body.username, hashedPassword, request.body.email))
		response.status(200).json({message: "success create account"});
	else
		response.status(400).json({message: "failure create account"});
	return;
}

function SignIn(request, response){

}

function SignOut(request, response){

}

module.exports = ROUTER;

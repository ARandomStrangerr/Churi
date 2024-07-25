const ROUTER = require("express").Router();
const DATABASE = require("../database/MongooseControl");

ROUTER.post("/sign-in", SignIn);
ROUTER.post("/sign-up", SignUp);
ROUTER.post("/sign-out", SignOut);
ROUTER.get("/is-sign-in", IsSignIn);

async function SignUp(request, response){
	if (!request.body.username || request.body.username.length === 0 || !request.body.password || request.body.password.length === 0 || !request.body.email || request.body.email.length === 0) {
		response.status(400).json({error: "Username, Password, and Email are required"});
		return;
	}
	if (await DATABASE.signUp(request.body.username, request.body.password, request.body.email))
		response.status(200).send("Successfully create and account");
	else
		response.status(400).send("Failure to create an account");
	return;
}

async function SignIn(request, response){
	if (!request.body.username || request.body.username.length === 0 || !request.body.password || request.body.password.length === 0){
		response.status(400).send("Username, and password are required");
		return;
	}
	const returnData = await DATABASE.signInUsername(request.body.username, request.body.password)
	if (returnData){
		request.session.userId = returnData.id;
    request.session.role = returnData.role;
		response.status(200).send("Successfully login");
	} else
		response.status(400).send("Incorrect username or password");
	return;
}

function IsSignIn(request, response) {
	request.session.userId ? response.status(200).send(true) : response.status(200).send(false);
}

function SignOut(request, response){

}

module.exports = ROUTER;

const MONGOOSE = require("mongoose");
const BCRYPT = require("bcryptjs");

const USER_SCHEMA = MONGOOSE.Schema({
	username:{type: String, unique: true, required: true},
	password:{type: String, required: true},
	email:{type: String, unique: true, required: true}
});

const USER_MODEL = MONGOOSE.model("User",USER_SCHEMA);

function connect(hostname, port, database){
	MONGOOSE.connect(`mongodb://${hostname}:${port}/${database}`);
}

async function signUp(username, password, email){
	const salt = await BCRYPT.genSalt(10);
	const hashedPassword = await BCRYPT.hash(password, salt);
	try {
		let newUser = new USER_MODEL({
			username: username,
			password: hashedPassword,
			email: email
		});
		await newUser.save();
		return true;
	} catch (e) {
		return false;
	}
}

function signInUsername(username, password){

}

function signInEmail(email, password){

}

module.exports = {
	connect: connect,
	signUp: signUp,
	signInUsername: signInUsername,
	signInEmail: signInEmail
}

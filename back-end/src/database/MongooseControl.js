const MONGOOSE = require("mongoose");

const USER_SCHEMA = MONGOOSE.Schema({
	username:{type: String, unique: true, required: true},
	password:{type: String, required: true},
	email:{type: String, unique: true, required: true}
});

const USER_MODEL = MONGOOSE.model("User",USER_SCHEMA);

function connect(hostname, port, database){
	MONGOOSE.connect(`mongodb://${hostname}:${port}/${database}`);
}

function signUp(username, hasedPassword, email){
	let newUser = new USER_MODEL({
		username: username,
		password: hasedPassword,
		email: email
	});
	newUser.save();
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

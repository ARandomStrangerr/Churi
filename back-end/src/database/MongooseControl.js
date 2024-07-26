const MONGOOSE = require("mongoose");
const BCRYPT = require("bcryptjs");

const USER_SCHEMA = MONGOOSE.Schema({
	username:{type: String, unique: true, required: true},
	password:{type: String, required: true},
	email:{type: String, unique: true, required: true},
	role: {type: String, enum: ["admin", "vendor", "employee", "customer"], default: "customer"}
});
const USER_MODEL = MONGOOSE.model("User",USER_SCHEMA);

const PRODUCT_SCHEMA = MONGOOSE.Schema({
	userId: {type:MONGOOSE.Schema.Types.ObjectId, ref:"User", require: true},
	name: {type: String, require: true},
	img: {type: []},
	price: {type: Number, require: true},
	stock: {type: Number, require: true},
	discount: Number
})
 /**
 * open a connection to the database with given params
 * @param {String} hostname 
 * @param {Number} port 
 * @param {String} database 
 */
function connect(hostname, port, database){
	MONGOOSE.connect(`mongodb://${hostname}:${port}/${database}`);
}

 /**
 * create an user with the given information
 * @param {String} username 
 * @param {String} password 
 * @param {String} email 
 * @returns boolean value which indicates that the user is created or not
 */
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
		console.log(e);
		return false;
	}
}

 /**
 * check the username and password match any record in the database
 * @param {String} username 
 * @param {String} password 
 * @returns an object with userId and their role if the a match found. null otherwise.
 */
async function signInUsername(username, password){
	const user = await USER_MODEL.findOne({username});
	if (!user || !(await BCRYPT.compare(password, user.password))) return null;
	return { id: user._id, role: user.role };
}

function signInEmail(email, password){

}

 /**
 * return a number of user that segmented into pages
 * @param {Number} limit: number of user per page
 * @param {Number} skip: skip number of results
 * @return an object that create
 */
async function getUserList(limit, skip){
	return await USER_MODEL.find().skip(skip).limit(limit).select("username email role");
}

module.exports = {
	connect: connect,
	signUp: signUp,
	signInUsername: signInUsername,
	signInEmail: signInEmail,
	getUserList: getUserList
}

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
	name: {type: String},
	img: {type: [String]},
	desc: {type: String},
	price: {type: Number},
	stock: {type: Number},
	discount: Number
})
const PRODUCT_MODEL = MONGOOSE.model("Product", PRODUCT_SCHEMA);

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

 /**
 * return a number of user that segmented into pages
 * @param {Number} limit: number of user per page
 * @param {Number} skip: skip number of results
 * @return an object that create
 */
async function getUserList(limit, skip){
	return await USER_MODEL.find().skip(skip).limit(limit).select("_id username email role");
}

async function createProduct(creatorId, name, imageFileName, desc, price, stock, discount) {
	try {
		let newProduct = new PRODUCT_MODEL({
			userId: creatorId,
			name: name,
			img: imageFileName,
			desc: desc,
			stock: stock,
			price: price,
			discount: discount
		});
		newProduct.save();
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}

async function updateProduct(productId, name, imageFileName, desc, stock, price, discount){
	let productUpdate = {
		name: name,
		img: imageFileName,
		desc: desc,
		stock: stock,
		price: price,
		discount: discount
	}
	const dataBeforeUpdate = await PRODUCT_MODEL.findById(productId);
	await PRODUCT_MODEL.findByIdAndUpdate(productId, productUpdate, {new: true});
	return dataBeforeUpdate.img;
}

async function getProductsList(limit, skip) {
	return await PRODUCT_MODEL.find().skip(skip).limit(limit).select("_id name userId price stock discount").populate({path: "userId", select: "username"}).lean();
}

async function getProduct(id) {
	return await PRODUCT_MODEL.findById(id);
}

async function deleteProduct(id) {
	try {
		return await PRODUCT_MODEL.findByIdAndDelete(id);
	} catch (e) {
		console.log(e);
		return false;
	}
}

module.exports = {
	connect: connect,
	createProduct: createProduct,
	signUp: signUp,
	signInUsername: signInUsername,
	getUserList: getUserList,
	getProductsList: getProductsList,
	getProduct: getProduct,
	updateProduct: updateProduct,
	deleteProduct: deleteProduct
}

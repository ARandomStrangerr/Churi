const MONGOOSE = require("mongoose");
const BCRYPT = require("bcryptjs");

const USER_SCHEMA = MONGOOSE.Schema({
	username: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	email: {type: String, unique: true, required: true},
	role: {type: String, enum: ["admin", "vendor", "employee", "customer"], default: "customer"}
});
const USER_MODEL = MONGOOSE.model("User",USER_SCHEMA);

const CATEGORY_SCHEMA = MONGOOSE.Schema({
	name: { type: String, required: true, unique: true }
});
const CATEGORY_MODEL = MONGOOSE.model("Category", CATEGORY_SCHEMA);

const PRODUCT_SCHEMA = MONGOOSE.Schema({
	userId: { type:MONGOOSE.Schema.Types.ObjectId, ref:"User", requied: true },
	name: { type: String },
	description: { type: [ String ] },
	category: { type: MONGOOSE.Schema.Types.ObjectId, ref: "Category" },
	published: { type: Boolean, default: false, required: true, enum: [true, false] },
	variant: [ { type: MONGOOSE.Schema.Types.ObjectId, ref: "Variant" } ],
	createAt: { type: Date, default: Date.now },
	updateAt: { type: Date, default: Date.now },
});
const PRODUCT_MODEL = MONGOOSE.model("Product", PRODUCT_SCHEMA);

const VARIANT_SCHEMA = MONGOOSE.Schema({
	productId: { type:MONGOOSE.Schema.Types.ObjectId, ref:"Product", required: true },
	name: { type: String },
	image: { type: [ String ]},
	prince: { type: Number },
	stock: { type: Number },
	discount: { type: Number }
});
const VARIANT_MODEL = MONGOOSE.model("Variant", VARIANT_SCHEMA);
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

function deleteUser(id){
	return USER_MODEL.findByIdAndDelete(id);
}

async function createProduct(creatorId, name, category, description, variant){
	try{
		// get the category id
		let categoryId = await CATEGORY_MODEL.findOne({name: category});
		if (categoryId) categoryId = categoryId._id;
		else {
			let newCategory = new CATEGORY_MODEL({
				name: category
			});
			await newCategory.save();
			categoryId = newCategory._id;
		}
		// make product object
		let newProduct = new PRODUCT_MODEL({
			userId: creatorId,
			name: name,
			description: description,
			category: categoryId,
			variant: []
		});
		// make variant objects
		for (let item of variant) {
			let newVariant = new VARIANT_MODEL({
				productId: newProduct._id,
				name: item.name,
				image: item.imageFileName,
				price: item.price,
				stock: item.stock,
				discount: item.discount
			});
			newProduct.variant.push(newVariant._id);
			newVariant.save();
		}
		newProduct.save();
		return true;
	}catch (e) {
		console.log(e);
		return false;
	}
}

async function getProducts(limit, skip) {
	let productList = await PRODUCT_MODEL.find().skip(skip).limit(limit).select("_id name userId category published variant").populate("userId").populate("category").lean();
	return productList;
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

async function getProduct(id) {
	return await PRODUCT_MODEL.findById(id).select("userId name cateogry description variant").populate("userId variant category").lean();
}

async function deleteProduct(id) {
	try {
		return await PRODUCT_MODEL.findByIdAndDelete(id);
	} catch (e) {
		console.log(e);
		return false;
	}
}

function getProductCard(){
	return PRODUCT_MODEL.find().select("name price stock img").lean();
}

module.exports = {
	connect: connect,
	createProduct: createProduct,
	signUp: signUp,
	signInUsername: signInUsername,
	deleteUser: deleteUser,
	getUserList: getUserList,
	getProducts: getProducts,
	getProduct: getProduct,
	updateProduct: updateProduct,
	deleteProduct: deleteProduct,
	getProductCard: getProductCard
}

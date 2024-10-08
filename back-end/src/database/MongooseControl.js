const MONGOOSE = require("mongoose");
const BCRYPT = require("bcryptjs");

const USER_SCHEMA = MONGOOSE.Schema({
	username: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	displayName: {type: String},
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
	price: { type: Number },
	stock: { type: Number },
	discount: { type: Number }
});
const VARIANT_MODEL = MONGOOSE.model("Variant", VARIANT_SCHEMA);

const EVENT_SCHEMA = MONGOOSE.Schema({
	name: { type: String, requied: true },
	start: { type: Date, requied: true },
	end: { type: Date, required: true },
	location: { type: String },
	participant: [{ type: MONGOOSE.Schema.Types.ObjectId, ref: "User" }]
})
const EVENT_MODEL = MONGOOSE.model("Event", EVENT_SCHEMA);

function connect(hostname, port, database){
	MONGOOSE.connect(`mongodb://${hostname}:${port}/${database}`);
}

// CRUD user model

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

async function signInUsername(username, password){
	const user = await USER_MODEL.findOne({username});
	if (!user || !(await BCRYPT.compare(password, user.password))) return null;
	return { id: user._id, role: user.role };
}

async function getUserList(limit, skip){
	return await USER_MODEL.find().skip(skip).limit(limit).select("_id username email role");
}

async function getEmployeeList() {
	return await USER_MODEL.find({role: "employee"}).lean();
}

async function updateUser(userId, displayName, phoneNumber, email, address, role){
	let updateUserObject = {};
	if (displayName) updateUserObject.displayName = displayName;
	if (phoneNumber) updateUserObject.phoneNumber = phoneNumber;
	if (email) updateUserObject.email = email;
	if (role) updateUserObject.role = role;
	try {
		await USER_MODEL.findByIdAndUpdate(userId, updateUserObject);
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}

function deleteUser(id){
	return USER_MODEL.findByIdAndDelete(id);
}

// CRUD products

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
				image: item.image,
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

async function getProduct(id, field, populateField) {
	return await PRODUCT_MODEL.findById(id).select(field).populate(populateField).lean();
}

function getProductCard(){
	return PRODUCT_MODEL.find().select("name variant").populate("variant").lean();
}

async function updateProduct(productId, name, published, category, description, variant) {
	let updateProductObject = {};
	if (name) updateProductObject.name = name;
	if (published != null) updateProductObject.published = published;
	if (category) updateProductObject.category = (await CATEGORY_MODEL.findOne({name: category}))._id;
	if (description) updateProductObject.description = description;
	if (variant) {
		updateProductObject.variant = [];
		for (let v of variant) {
			if (v._id) {
				await VARIANT_MODEL.findByIdAndUpdate(v._id, v);
				updateProductObject.variant.push(v._id);
			} else {
				v.productId = productId;
				let newVariant = new VARIANT_MODEL(v);
				await newVariant.save();
				updateProductObject.variant.push(newVariant._id);
			}
		}
	}
	const dataBeforeUpdate = await PRODUCT_MODEL.findById(productId).populate("userId variant").lean();
	await PRODUCT_MODEL.findByIdAndUpdate(productId, updateProductObject, { new: true });
	return dataBeforeUpdate;
}

async function deleteProduct(id) {
	try {
		return await PRODUCT_MODEL.findByIdAndDelete(id);
	} catch (e) {
		console.log(e);
		return false;
	}
}

function createEvent(name, start, end, location, participant){
	let newEvent = new EVENT_MODEL({
		name: name,
		start: start,
		end: end,
		location: location,
		participant: participant
	});
	newEvent.save();
}

async function getEvents(startTimeRange, endTimeRange){}

async function getEvent(eventId){}

async function updateEvent(eventId, begin, end, locaiton, participant){}

async function deleteEvent(eventId){}

module.exports = {
	connect: connect,
	createProduct: createProduct,
	signUp: signUp,
	signInUsername: signInUsername,
	updateUser: updateUser,
	deleteUser: deleteUser,
	getUserList: getUserList,
	getProducts: getProducts,
	getProduct: getProduct,
	updateProduct: updateProduct,
	deleteProduct: deleteProduct,
	getProductCard: getProductCard,
	createEvent: createEvent,
	getEvents: getEvents,
	getEvent: getEvent,
	updateEvent: updateEvent,
	deleteEvent: deleteEvent,
	getEmployeeList: getEmployeeList
}

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	// firstName: { type: String, required: true },
	// lastName: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
});

// userSchema.methods.generateAuthToken = function () {
// 	console.log('generateAuthToken');
// 	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
// 		expiresIn: "7d",
// 	});
// 	return token;
// };

const User = mongoose.model("companylogins", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		// firstName: Joi.string().required().label("First Name"),
		// lastName: Joi.string().required().label("Last Name"),
		username: Joi.string().required().label("Username"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };

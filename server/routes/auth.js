const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		
		const { error } = validate(req.body);
		console.log(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });
			
		const user = await User.findOne({ username: req.body.username });
		if (!user){
			return res.status(401).send({ message: "Invalid Username or Password" });
		}

		const validPassword = (req.body.password == user.password);
		
		if (!validPassword){
			console.log(req.body);
			return res.status(401).send({ message: "Invalid Username or Password" });
		}

		// const token = user.generateAuthToken();
		res.status(200).send({  message: "logged in successfully" });
	} catch (error) {
		
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;

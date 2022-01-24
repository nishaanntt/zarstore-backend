const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please Enter Your First Name'],
		minlength: [3, 'First Name Should Be At Least 3 Characters'],
	},
	lastName: {
		type: String,
		required: [true, 'Please Enter Your Last Name'],
		minlength: [3, 'Last Name Should Be At Least 3 Characters'],
	},
	email: {
		type: String,
		required: [true, 'Please Enter Your Email Address'],
		unique: true,
		validate: [validator.isEmail, 'Please Enter A Valid Email'],
	},
	password: {
		type: String,
		required: [true, 'Please Enter Your Password'],
		minlength: [8, 'The Password Should Be At Least 8 Characters'],
		select: false,
	},
	avatar: {
		publicId: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: 'user',
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

// Hash Password
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	this.password = await bcryptjs.hash(this.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcryptjs.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

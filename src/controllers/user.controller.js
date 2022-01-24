const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/user.model');
const sendToken = require('../utils/jwtToken');

// Register
exports.register = catchAsyncErrors(async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;

	const user = await User.create({
		firstName,
		lastName,
		email,
		password,
		avatar: {
			publicId: 'sameple id',
			url: 'profile pic url',
		},
	});

	sendToken(user, 201, res);
});

// Login
exports.login = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	// checking if the user has entered both email and password
	if (!email || !password) {
		return next(new ErrorHandler('Please enter email and password', 400));
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorHandler('Invalid Email or Password', 401));
	}

	const isPasswordMatched = user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler('Invalid Email or Password', 401));
	}

	sendToken(user, 200, res);
});

// Logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: 'User Logged Out Successfully',
	});
});

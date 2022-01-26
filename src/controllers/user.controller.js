const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/user.model');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

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

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHandler('User not found', 404));
	}

	// Get ResetPassword Token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/password/${resetToken}`;

	const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: `ZarStore Password Recovery`,
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email} successfully.`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message, 500));
	}
});

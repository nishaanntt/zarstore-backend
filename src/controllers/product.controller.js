const Product = require('../models/product.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
	req.body.createdBy = req.user.id;

	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
});

//List Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
	const resultPerPage = 5;
	const count = await Product.countDocuments();

	const apiFeature = new ApiFeatures(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resultPerPage);

	const products = await apiFeature.query;
	res.status(200).json({
		success: true,
		count,
		products,
	});
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('Product Not Found', 404));
	}

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		product,
	});
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('Product Not Found', 404));
	}

	await product.remove();

	res.status(200).json({
		success: true,
		message: 'Product Deleted Successfully!',
	});
});

// Product Details
exports.productDetails = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('Product Not Found', 404));
	}

	res.status(200).json({
		success: true,
		product,
	});
});

const Product = require('../models/product.model');

//Create Product
// exports.createProduct = async (req, res, next) => {
// 	// const product = await Product.create(req.body);

// 	res.status(201).json({
// 		message: 'Routes is working',
// 		// success: true,
// 		// product,
// 	});
// };

//Create Product
exports.createProduct = async (req, res, next) => {
	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		message: 'Route is working',
		product,
	});
};

exports.getAllProducts = (req, res) => {
	res.status(200).json({
		message: 'Route is working',
	});
};

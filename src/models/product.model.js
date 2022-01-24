const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter the product name'],
		trim: true,
	},
	description: {
		type: String,
		required: [true, 'Please enter the product description'],
	},
	price: {
		type: Number,
		required: [true, 'Please enter the product price'],
		maxlength: [6, 'The product price cannot exceed 6 characters'],
	},
	ratings: {
		type: Number,
		default: 0,
	},
	images: [
		{
			publicId: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, 'Please enter the product category'],
	},
	stock: {
		type: Number,
		required: [true, 'Please enter product stock'],
		maxlength: [4, 'The stock cannot exceed 4 characters'],
		default: 1,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
		},
	],
	createdBy: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Product', productSchema);

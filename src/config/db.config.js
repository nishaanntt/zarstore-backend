const mongoose = require('mongoose');

const connectDb = () => {
	mongoose
		.connect(process.env.MONGO_URL)
		.then(data => {
			console.log(`MongoDB connected with server: ${data.connection.host}`);
		})
		.catch(err => {
			console.log(`MongoDB Connection Error ==> ${err}`);
		});
};

module.exports = connectDb;

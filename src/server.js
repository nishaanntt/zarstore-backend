const app = require('./app');
const dotenv = require('dotenv');

const connectDb = require('./config/db.config');

// Handling Uncaught Exception
process.on('uncaughtException', err => {
	console.log(`Error: ${err.message}`);
	console.log('Shutting down the server due to uncaught exception');
	process.exit(1);
});

//Config
dotenv.config({
	path: './src/config/config.env',
});

//Connecting Database
connectDb();

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
	console.log(`The Server is running on http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', err => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to unhandled promise rejection`);

	server.close(() => {
		process.exit(1);
	});
});

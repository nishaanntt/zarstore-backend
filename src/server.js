const app = require('./app');
const dotenv = require('dotenv');

const connectDb = require('./config/db.config');

//Config
dotenv.config({
	path: './src/config/config.env',
});

//Connecting Database
connectDb();

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`The Server is running on http://localhost:${PORT}`);
});

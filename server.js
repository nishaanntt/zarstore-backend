const app = require('./app');

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`The server is running on http://localhost:${PORT}`);
});

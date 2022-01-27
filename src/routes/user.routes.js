const express = require('express');
const {
	register,
	login,
	logout,
	forgotPassword,
	resetPassword,
} = require('../controllers/user.controller');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').post(logout);

module.exports = router;

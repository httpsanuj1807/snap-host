const express = require('express');
const { githubAuth, isVerifiedUser } = require('../controllers/auth.controller.js');
const verifyToken = require('../utils/verifyToken.js')

const router = express.Router();

router.post('/github', githubAuth);
router.get('/verify-user', verifyToken, isVerifiedUser);

module.exports =  router;
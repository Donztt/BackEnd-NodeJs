const express = require('express');
const router = new express.Router();

const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.get('/user/:id', userController.getUserReqRes);
router.get('/user/:id/avatar', userController.getUserReqResAvatar);
router.delete('/user/:id/avatar', userController.deleteUser);

module.exports = router;

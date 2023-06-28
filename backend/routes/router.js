const express = require('express');
const router = new express.Router();

const servicesRouter = require('./services');

router.use('/', servicesRouter);

module.exports = router;

const router = require('express').Router();

const apiRoute = require('./api');
const homeRoute = require('./homeRoute.js');


router.use('/', homeRoute);
router.use('/api', apiRoute);

module.exports = router;
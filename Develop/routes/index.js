const router = require('express').Router();

const apiRoute = require('./api/mainRouter');
const homeRoute = require('./homeRoute.js');


router.use('/', homeRoute);
router.use('/api', apiRoute);

module.exports = router;
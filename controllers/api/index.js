const router = require('express').Router();
const readerRoutes = require('./readerRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/readers', readerRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;

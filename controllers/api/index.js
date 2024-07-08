const router = require('express').Router();
const readerRoutes = require('./readerRoutes');
const reviewRoutes = require('./reviewRoutes');
const bookRoutes = require("./bookRoutes");

router.use('/readers', readerRoutes);
router.use('/reviews', reviewRoutes);
router.use('/books', bookRoutes);

module.exports = router;

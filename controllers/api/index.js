const router = require('express').Router();
const readerRoutes = require('./readerRoutes');
const reviewRoutes = require('./reviewRoutes');
const booksRoutes = require('./bookRoutes');

router.use('/readers', readerRoutes);
router.use('/reviews', reviewRoutes);
router.use('/books', booksRoutes);

module.exports = router;

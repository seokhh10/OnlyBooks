const router = require('express').Router();
const { Book } = require('../../models');

const withAuth = require('../../utils/auth');

// Create a new book in the db.
router.post('/', withAuth, async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
      reader_id: req.session.reader_id,
    });

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get a all books in the db
router.get('/', withAuth, async (req, res) => {
    try {
      const newBook = await Book.findAll();
  
      res.status(200).json(newBook);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// GET the book by book_id
router.get('/:book_id', withAuth, async (req, res) => {
  try {
    const book = await Book.findAll({
      where: {
        book_id: req.params.book_id
      }
    });

    res.status(200).json(book);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
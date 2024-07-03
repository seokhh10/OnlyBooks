const router = require('express').Router();
const { Book, Reader, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all Books
    const bookData = await Book.findAll();

    // Serialize data so the template can read it
    const books = bookData.map((Book) => Book.get({ plain: true }));
    const bookLimit = books.slice(0, 5)

    res.render('homepage', {
        bookLimit
      });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bookList', async (req, res) => {
  try {
    // Get all Books
    const bookData = await Book.findAll();

    // Serialize data so the template can read it
    const books = bookData.map((Book) => Book.get({ plain: true }));
    
    // Pass serialized data and session flag into template
    res.render('bookList', {
      books
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id);
    const reviewData = await Review.findAll({
      where: {
        book_id: req.params.id
      }
    });

    const book = bookData.get({ plain: true });
    const reviews = reviewData.map(r => r.get({ plain: true }));

    console.log('reviews >>>', reviews);
    console.log('>>>>>>>>>>>>>>>');
    console.log('book >>>', book);

    res.render('book', {
      ...{ book, reviews },
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const readerData = await Reader.findByPk(req.session.reader_id, {
      attributes: { exclude: ['password'] },
    });

    const reader = readerData.get({ plain: true });

    res.render('profile', {
      ...reader,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;

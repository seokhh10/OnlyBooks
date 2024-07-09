const router = require('express').Router();
const { Book, Reader, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all Books
    const bookData = await Book.findAll();
    const reviewData = await Review.findAll({
      include: [
        {
          model: Book,
          attributes: ['title'],
        },
      ],
    });

    // Serialize data so the template can read it
    const books = bookData.map((Book) => Book.get({ plain: true }));
    const bookLimit = books.slice(0, 5);
    const reviews = await Promise.all(reviewData
      .map(review => review.get({ plain: true }))
      .map(async (review) => ({
        ...review,
        readerName: (await Reader.findByPk(review.reader_id))?.get({ plain: true })?.name,
        bookTitle:(await Book.findByPk(review.book_id))?.get({ plain: true })?.title
      }))
    );
    const reviewLimit = reviews.slice(0, 3);

    res.render('homepage', {
      ...{ bookLimit, reviewLimit },
      logged_in: req.session.logged_in
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
    const reviews = await Promise.all(reviewData
      .map(review => review.get({ plain: true }))
      .map(async (review) => ({
        ...review,
        readerName: (await Reader.findByPk(review.reader_id))?.get({ plain: true })?.name
      }))
    )

    res.render('book', {
      ...{ book, reviews },
      logged_in: req.session.logged_in
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



// HomeRoute for add a book and review of PROFILE
// Use withAuth middleware to prevent access to route
router.get('/profile/addBook', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const readerData = await Reader.findByPk(req.session.reader_id, {
      attributes: { exclude: ['password'] },
    });
     const reader = readerData.get({ plain: true });

    res.render('profileAddBook', {
      ...reader,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// HomeRoute for add a review of PROFILE
// Use withAuth middleware to prevent access to route
router.get('/profile/addReview', withAuth, async (req, res) => {
  try {
    // Find all books in db
    const booksData = await Book.findAll();

    const books = booksData.map(book => book.get({ plain: true }));
    
    // console.log(reader);
    console.log(books);
    console.log(books.length);
    res.render('profileAddReview', {
      books,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// HomeRoute for delete a review of PROFILE
// Use withAuth middleware to prevent access to route
router.get('/profile/deleteReview', withAuth, async (req, res) => {
  try {
    // Find all review for a reader
    const reviewData = await Review.findAll({
      include: [ { model: Book}, {model: Reader} ],
      where: { reader_id : req.session.reader_id }
    });

    const reviews = reviewData.map(review => review.get({ plain: true }));
    
    // console.log(reader);
    console.log(reviews);
    console.log(reviews.length);
    res.render('profileDeleteReview', {
      reviews,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;

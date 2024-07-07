const router = require('express').Router();
const { Review, Book, Reader } = require('../../models');
const moment = require('moment');

const withAuth = require('../../utils/auth');

// CREATE a new review associated with a book
// the book_id will be a param in the url route.
// This route is called from profileaddreview.js
router.post('/:book_id', withAuth, async (req, res) => {
  console.log('Entrando a la route reviews/post/:bookid');
  console.log('Hola mundo');
  console.log(req.params.book_id);
  console.log(req.session.reader_id);
  try {
    const newReview = await Review.create({
      ...req.body,
      book_id: req.params.book_id,
      reader_id: req.session.reader_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a review
// This route is called from profiledeletereview.js
router.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log('entrando al borrado de review');
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Check if the next Routes are iin use ----------------------------------------

// GET a review
router.get('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [ {model: Book}  ],      
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }
    res.render('review');
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findAll();

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }

    res.render('reviews')
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET All reviews by book_id. GET localhost:3001/api/reviews/3
router.get('/book/:book_id', async (req, res) => {
  try {
    console.log('entrando a /book/:book_id');
    const bookData = await Book.findByPk(req.params.book_id);
    const reviewData = await Review.findAll({
      include: [ { model: Reader} ],
      where: {
        book_id: req.params.book_id
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
    console.log('saliendo por error');
    console.log(err);
    res.status(500).json(err);
  }
});

// GET All reviews by user_id.  GET localhost:3002/api/reviews/reader/iskanalu.
router.get('/reader/:reader_id', withAuth, async (req, res) => {
  try {
    const newReview = await Review.findAll({
      where: {
        reader_id: req.session.reader_id,
      }
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET All latest reviews where date_created is greater than today - 31 days. GET localhost:3002/api/reviews/latest
router.get('/latest', withAuth, async (req, res) => {
  try {
    const newReview = await Review.findAll({
      where: {
        date_created: {
          [Op.gte]: moment().subtract(31, 'days').toDate()
        }
      }
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

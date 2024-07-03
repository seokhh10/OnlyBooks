const router = require('express').Router();
const { Review, Book } = require('../../models');
const moment = require('moment');

const withAuth = require('../../utils/auth');

// Create a new post associated with a book_id, the book_id will be param in the url route.
router.post('/:book_id', withAuth, async (req, res) => {
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

// GET All reviews by book_id. GET localhost:3002/api/reviews/3 
router.get('/:book_id', withAuth, async (req, res) => {
  try {
    const newReview = await Review.findAll({
      where: {
        book_id: req.params.book_id
      }
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
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

// Delete a review based on the id. DELETE localhost:3002/api/reviews/3
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        reader_id: req.session.reader_id,
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

module.exports = router;

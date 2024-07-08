const router = require('express').Router();
const { Book } = require('../../models');

router.get('/:id', async (req, res) => {
    // find a single book by its `id` including its associated reviews 
    try {
      const bookData = await Book.findByPk(req.params.id, {
            include: [ {model: Review}  ],      
      });
      if (!bookData) {
        res.status(404).json({ message: 'No book found with this id!' });
        return;
      }
      res.render('book');
      res.status(200).json(bookData);
      console.log();
    } catch (err) {
      res.status(500).json(err);
    }  
});


// find all books
router.get('/', async (req, res) => {
   // be sure to include all of their associated reviews
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


// Add a book route
// This route is called by profileaddbook.js
router.post("/", async (req, res)=>{
    try {
        console.log('POST a book')
        let newBook = await Book.create(req.body);
        res.status(200).json(newBook)
        console.log(newBook.id);
        } 
    catch(err) {
               console.log(err);
               res.status(500).json(err);
               }
});

module.exports = router;
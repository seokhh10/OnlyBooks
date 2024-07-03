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

 router.get('/', async (req, res) => {
   // find all books
   // be sure to include all of their associated reviews
   try {
       const bookData = await Book.findAll();
       res.status(200).json(bookData);
       res.render('books')
   } catch (err) {
     res.status(500).json(err);
   }
 });

router.post("/", async (req, res)=>{
    try {
        console.log("This is the req.body ==== ", req.body)
        let newBook = await Book.create(req.body);

        res.status(200).json(newBook)

        console.log(newBook.id);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
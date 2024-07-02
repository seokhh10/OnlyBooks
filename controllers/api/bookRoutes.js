const router = require('express').Router();
const {Book} = require('../../models');


router.post("/", async (req, res)=>{
    try {
        console.log("This is the req.body ==== ", req.body)
        let newBook = await Book.create(req.body);

        res.status(200).json(newBook)


    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
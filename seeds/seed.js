const sequelize = require('../config/connection');
const { Reader, Review, Book } = require('../models');

const readerData = require('./readerData.json');
const reviewData = require('./reviewData.json');
const bookData = require('./bookData.json');
const { faker } = require('@faker-js/faker');

//Generate a list of books
const generateFakeBooks = (numBooks) =>{
const books = [];
for (let i = 0; i < numBooks; i++) {
    const book = {
        title: faker.music.songName(),
        author: faker.person.fullName(),
        };
        books.push(book);
}
return books;
};

//Generate 10 books
const fakeBooks = generateFakeBooks(10);
console.log(fakeBooks);

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const readers = await Reader.bulkCreate(readerData, {
    individualHooks: true,
    returning: true,
  });

  const book = await Book.bulkCreate(fakeBooks);

  for (const review of reviewData) {
    await Review.create({
      ...review,
      reader_id: readers[Math.floor(Math.random() * readers.length)].id,
      book_id: book[Math.floor(Math.random() * book.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

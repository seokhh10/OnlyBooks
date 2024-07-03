const sequelize = require('../config/connection');
const { Reader, Review, Book } = require('../models');
import { faker } from '@faker-js/faker'; 

const readerData = require('./readerData.json');
const reviewData = require('./reviewData.json');
const bookData = require('./bookData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const readers = await Reader.bulkCreate(readerData, {
    individualHooks: true,
    returning: true,
  });

  const book = await Book.bulkCreate(bookData, {
    individualHooks: true,
    returning: true,
  });

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

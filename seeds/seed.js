const sequelize = require('../config/connection');
const { Reader, Review, Book } = require('../models');

const { faker } = require('@faker-js/faker'); // Correct import for faker in CommonJS

const readerData = require('./readerData.json');
const reviewData = require('./reviewData.json');

// Function to generate fake readers
const generateFakeReaders = (numReaders) => {
  const readers = [];
  for (let i = 0; i < numReaders; i++) {
    const reader = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(), // method for passwords in real applications
    };
    readers.push(reader);
  }
  return readers;
};

// Function to generate fake books
const generateFakeBooks = (numBooks) => {
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

// Generate 10 fake books
const fakeBooks = generateFakeBooks(10);
console.log('Fake Books:', fakeBooks);

// Generate 5 fake readers
const fakeReaders = generateFakeReaders(5);
console.log('Fake Readers:', fakeReaders);


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Bulk create fake readers
  const readers = await Reader.bulkCreate(fakeReaders, {
    individualHooks: true, 
    returning: true,
  });

  // Add the existing reader data if needed
  const moreReaders = await Reader.bulkCreate(readerData, {
    individualHooks: true,
    returning: true,
  });

  const books = await Book.bulkCreate(fakeBooks);

  for (const review of reviewData) {
    await Review.create({
      ...review,
      reader_id: readers[Math.floor(Math.random() * readers.length)].id,
      book_id: books[Math.floor(Math.random() * books.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
const sequelize = require('../config/connection');
const { Reader, Review } = require('../models');

const readerData = require('./readerData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const readers = await Reader.bulkCreate(readerData, {
    individualHooks: true,
    returning: true,
  });

  for (const review of reviewData) {
    await Review.create({
      ...review,
      reader_id: readers[Math.floor(Math.random() * readers.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

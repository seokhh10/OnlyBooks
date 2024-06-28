const Reader = require('./Reader');
const Review = require('./Review');
const Book = require('./Book')

Reader.hasMany(Review, {
  foreignKey: 'reader_id',
  onDelete: 'CASCADE'
});
Book.hasMany(Review, {
  foreignKey: 'reader_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(Reader, {
  foreignKey: 'reader_id'
});
Review.belongsTo(Book, {
  foreignKey: 'book_id'
});

module.exports = { Reader, Review };

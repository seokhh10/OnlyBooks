const Reader = require('./Reader');
const Review = require('./Review');

Reader.hasMany(Review, {
  foreignKey: 'reader_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(Reader, {
  foreignKey: 'reader_id'
});

module.exports = { Reader, Review };

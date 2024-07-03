const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  // Using the provided database URL for production
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // This is necessary to avoid SSL certificate validation errors
      }
    }
  });
} else {
  // Fallback to local development configuration
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
      }
  );
}

module.exports = sequelize;


// if (process.env.DB_URL) {
//   sequelize = new Sequelize(process.env.DB_URL);
// } else {
//     sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: 'localhost',
//       dialect: 'postgres'
//     }
//   );
// }

// module.exports = sequelize;

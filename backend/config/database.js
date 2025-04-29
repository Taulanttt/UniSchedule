const { Sequelize } = require('sequelize');
require('dotenv').config(); // 🛡️ Load .env variables

const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

let sequelize;

if (process.env.DATABASE_URL) {
  // If DATABASE_URL exists, connect to cloud database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  // Otherwise connect locally
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port || 5432,
      dialect: config.dialect,
      logging: false,
    }
  );
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected Successfully!');
    await sequelize.sync({ alter: true });
    console.log('✅ Database Synced!');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };

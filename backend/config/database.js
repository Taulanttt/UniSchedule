const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

let sequelize;

if (env === 'production') {
  // Use DATABASE_URL in production with SSL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
    logging: false
  });
} else {
  // Local development or test
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      logging: false
    }
  );
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected Successfully!');
    await sequelize.sync({ alter: true });
    console.log('Database Synced!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };

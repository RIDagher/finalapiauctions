import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER, //
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Disable query logs
  }
);

// Function to Test Connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error(' Database connection error:', err.message);
    process.exit(1); // Stop server if DB connection fails
  }
};

export { sequelize, connectDB };
// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.sequelize
//   .sync()
//   .then(() => console.log('Database synchronized'))
//   .catch((err) => console.error('Error syncing database:', err));

export default sequelize;

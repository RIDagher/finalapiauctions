import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import log from './app/util/logger.js';
// import db from './app/config/db.js';
import auctionRoutes from './app/routes/auction.routes.js';
import { sequelize, connectDB } from './app/config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//  Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('client'));

// Logging middleware (logs all requests)
app.use((req, res, next) => {
  log.http(req.method, req.url);
  next();
});

// API Routes
app.use('/api/auctions', auctionRoutes);

// Global Eroor handler middleware
app.use((req, res, next) => {
  const ipAddress = req.socket.remoteAddress || 'Unknown IP';
  log.http(`Request: ${req.method} ${req.url}`, ipAddress);
  next();
});

// ✅ First, Connect to DB, Then Sync Models & Start Server
const startServer = async () => {
  await connectDB(); // Wait for DB connection
  sequelize
    .sync()
    .then(() => {
      log.info('DB', '✅ Database synchronized successfully');
      app.listen(port, () => {
        log.info('Server', `🚀 Running on port ${port}`);
      });
    })
    .catch((err) => {
      log.error('DB', ` Error syncing database: ${err.message}`);
      process.exit(1); // Stop server if DB sync fails
    });
};

startServer();

// Ensure database sync includes all models
// db.sequelize
//   .sync()
//   .then(() => log.success('DB', 'Database synchronized'))
//   .catch((err) => log.error('DB', `Error syncing database: ${err.message}`));

// //  Start server
// app.listen(port, () => {
//   log.info('Server', `Running on port ${port}`);
// });

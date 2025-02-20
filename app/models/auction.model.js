import { DataTypes } from 'sequelize';
// import db from '../config/db.js';
import sequelize from '../config/db.js';

const Auction = sequelize.define('Auction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  itemCode: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  itemDesc: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  sellerEmail: {
    type: DataTypes.STRING(320),
    allowNull: false,
    validate: { isEmail: true },
  },
  lastBid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: null,
  },
  lastBidderEmail: {
    type: DataTypes.STRING(250),
    allowNull: true,
    validate: { isEmail: true },
  },
});

export default Auction;

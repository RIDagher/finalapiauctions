import express from 'express';
import {
  validateAuction,
  validateBid,
} from '../../middlewares/auction.validator.js';
import {
  createAuction,
  getAllAuctions,
  getAuctionById,
  updateAuctionBid,
} from '../controllers/auction.controller.js';

const router = express.Router();

// GET all auctions
router.get('/', getAllAuctions);

//  GET a single auction by ID
router.get('/:id', getAuctionById);

// POST create a new auction
router.post('/', validateAuction, createAuction);

router.patch('/:id', validateBid, updateAuctionBid);

export default router;

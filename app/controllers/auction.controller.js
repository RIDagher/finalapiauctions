import Auction from '../models/auction.model.js';
import log from '../util/logger.js';
import { body, validationResult } from 'express-validator';

// GET all auctions (with optional sorting)
export const getAllAuctions = async (req, res) => {
  try {
    const { sortBy } = req.query;
    const order = sortBy ? [[sortBy, 'ASC']] : [];

    const auctions = await Auction.findAll({ order });

    log.info('GET /api/auctions', `Fetched ${auctions.length} auctions`);
    return res.status(200).json(auctions);
  } catch (error) {
    log.error('GET /api/auctions', `Error fetching auctions: ${error.message}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET a single auction by ID
export const getAuctionById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      log.warn('GET /api/auctions/:id', 'Invalid ID format');
      return res.status(400).json({ message: 'Auction ID must be a number' });
    }

    const auction = await Auction.findByPk(id);
    if (!auction) {
      log.warn('GET /api/auctions/:id', `Auction ID ${id} not found`);
      return res.status(404).json({ message: 'Auction not found' });
    }

    log.info('GET /api/auctions/:id', `Auction ID ${id} retrieved`);
    return res.status(200).json(auction);
  } catch (error) {
    log.error(
      'GET /api/auctions/:id',
      `Error fetching auction: ${error.message}`
    );
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// POST: Create a new auction
export const createAuction = async (req, res) => {
  log.info('recieved request to create new auction');
  try {
    const { itemCode, itemDesc, sellerEmail } = req.body;

    const existingAuction = await Auction.findOne({ where: { itemCode } });

    if (existingAuction) {
      log.warn(`Auction with itemCode ${itemCode} already exists`);
      return res.status(409).json({ message: 'Item code already exist' });
    }

    const newAuction = await Auction.create({
      itemCode,
      itemDesc,
      sellerEmail,
      lastBid: null,
      lastBidderEmail: null,
    });

    log.info(`Auction created succesfully: ${newAuction}`);
    return res.status(201).json(newAuction);
  } catch (err) {
    log.error(`Error creating auction ${err.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PATCH: Update an auction (only lastBid and lastBidderEmail)
export const updateAuctionBid = async (req, res) => {
  try {
    const { id } = req.params;
    const { lastBid, lastBidderEmail } = req.body;

    const auction = await Auction.findByPk(id);
    if (!auction) {
      log.warn(`Auction with ID ${id} not found in database`);
      return res.status(404).json({ message: 'Auction not found' });
    }

    if (lastBid <= auction.lastBid) {
      log.warn(
        `bid rejected: ${lastBid} is not higher than ${auction.lastBid}`
      );
      return res
        .status(400)
        .json({ message: 'Bid must be higher than the last bid' });
    }

    auction.lastBid = lastBid;
    auction.lastBidderEmail = lastBidderEmail;
    await auction.save();

    log.info(`Bid of ${lastBid} was placed succefully`);
    return res.status(200).json({ message: 'bid placed successfully ' });
  } catch (err) {
    log.error(`Error placing bid: ${err.message}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

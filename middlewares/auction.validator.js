import { check, validationResult } from 'express-validator';
import log from '../app/util/logger.js';
import { json } from 'sequelize';

export const validateAuction = [
  check('itemCode')
    .isLength({ min: 2, max: 20 })
    .matches(/^[a-zA-Z0-9 .-]+$/)
    .withMessage('Item code must be 2-20 characters'),

  check('itemDesc')
    .isLength({ min: 1, max: 200 })
    .withMessage('Description must be 1-200 characters long'),

  check('sellerEmail').isEmail().withMessage('Invalid email format'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      log.error(`Error validation ${JSON.stringify(errors.array())}`);

      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateBid = [
  check('lastBid')
    .isDecimal({ gt: 0 })
    .withMessage('Bid must be a number greate than 0'),

  check('lastBidderEmail').isEmail().withMessage('Invalid email format'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      log.error(`Error validation ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const express = require('express');
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const {
  getShops,
  getShopById,
  addShop,
  updateShop,
  removeShop,
  // addReview,
} = require('./Shop.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getShops);
router.get('/:id', getShopById);
// router.post('/', requireAuth, requireAdmin, addShop)
router.post('/', addShop);
// router.put('/:id', requireAuth, requireAdmin, updateShop)
router.put('/:id', updateShop);
// router.delete('/:id', requireAuth, requireAdmin, removeShop)
router.delete('/:id', removeShop);

module.exports = router;

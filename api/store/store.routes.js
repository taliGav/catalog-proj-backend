const express = require('express');
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const {
  getStores,
  getStoreById,
  addStore,
  updateStore,
  removeStore,
  // addReview,
} = require('./Store.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getStores);
router.get('/:id', getStoreById);
// router.post('/', requireAuth, requireAdmin, addStore)
router.post('/', addStore);
// router.put('/:id', requireAuth, requireAdmin, updateStore)
router.put('/:id', updateStore);
// router.delete('/:id', requireAuth, requireAdmin, removeStore)
router.delete('/:id', removeStore);

module.exports = router;

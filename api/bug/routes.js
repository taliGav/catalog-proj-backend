const express = require('express');
const router = express.Router();
const { log } = require('../../middlewares/logger.middleware');
const {
  getBugs,
  getBugById,
  addBug,
  updateBug,
  removeBug,
} = require('./bug.controller');

router.get('/', log, getBugs);
router.get('/:id', getBugById);
router.post('/', addBug);
router.put('/:id', updateBug);
router.delete('/:id', removeBug);

module.exports = router;

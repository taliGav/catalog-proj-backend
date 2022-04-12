const shopService = require('./shop.service.js');
const logger = require('../../services/logger.service');

// GET LIST
async function getShops(req, res) {
  try {
    var queryParams = req.query;
    const shops = await shopService.query(queryParams);
    res.json(shops);
  } catch (err) {
    logger.error('Failed to get shops', err);
    res.status(500).send({ err: 'Failed to get shops' });
  }
}

// GET BY ID
async function getShopById(req, res) {
  try {
    const shopId = req.params.id;
    const shop = await shopService.getById(shopId);
    res.json(shop);
  } catch (err) {
    logger.error('Failed to get shop', err);
    res.status(500).send({ err: 'Failed to get shop' });
  }
}

// POST (add shop)
async function addShop(req, res) {
  try {
    const shop = req.body;
    cl;
    const addedShop = await shopService.add(shop);
    console.log('addedShop', addedShop);
    res.json(addedShop);
  } catch (err) {
    logger.error('Failed to add shop', err);
    res.status(500).send({ err: 'Failed to add shop' });
  }
}

// PUT (Update shop)
async function updateShop(req, res) {
  try {
    const shop = req.body;
    console.log('shop', shop);
    const updatedShop = await shopService.update(shop);
    res.json(updatedShop);
  } catch (err) {
    logger.error('Failed to update shop', err);
    res.status(500).send({ err: 'Failed to update shop' });
  }
}

// DELETE (Remove shop)
async function removeShop(req, res) {
  try {
    const shopId = req.params.id;
    const removedId = await shopService.remove(shopId);
    res.send(removedId);
  } catch (err) {
    logger.error('Failed to remove shop', err);
    res.status(500).send({ err: 'Failed to remove shop' });
  }
}

module.exports = {
  getShops,
  getShopById,
  addShop,
  updateShop,
  removeShop,
};

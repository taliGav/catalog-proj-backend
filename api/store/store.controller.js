const storeService = require('./store.service.js');
const logger = require('../../services/logger.service');

// GET LIST
async function getStores(req, res) {
  try {
    var queryParams = req.query;
    const stores = await storeService.query(queryParams);
    res.json(stores);
  } catch (err) {
    logger.error('Failed to get stores', err);
    res.status(500).send({ err: 'Failed to get stores' });
  }
}

// GET BY ID
async function getStoreById(req, res) {
  console.log('req.body._id', req.params.id);
  try {
    const storeId = req.params.id;
    const store = await storeService.getById(storeId);
    res.json(store);
  } catch (err) {
    logger.error('Failed to get store', err);
    res.status(500).send({ err: 'Failed to get store' });
  }
}

// POST (add store)
async function addStore(req, res) {
  try {
    const store = req.body;
    cl;
    const addedStore = await storeService.add(store);
    console.log('addedStore', addedStore);
    res.json(addedStore);
  } catch (err) {
    logger.error('Failed to add store', err);
    res.status(500).send({ err: 'Failed to add store' });
  }
}

// PUT (Update store)
async function updateStore(req, res) {
  try {
    const store = req.body;
    console.log('store', store);
    const updatedStore = await storeService.update(store);
    res.json(updatedStore);
  } catch (err) {
    logger.error('Failed to update store', err);
    res.status(500).send({ err: 'Failed to update store' });
  }
}

// DELETE (Remove store)
async function removeStore(req, res) {
  try {
    const storeId = req.params.id;
    const removedId = await storeService.remove(storeId);
    res.send(removedId);
  } catch (err) {
    logger.error('Failed to remove store', err);
    res.status(500).send({ err: 'Failed to remove store' });
  }
}

module.exports = {
  getStores,
  getStoreById,
  addStore,
  updateStore,
  removeStore,
};

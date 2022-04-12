const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy);

    const collection = await dbService.getCollection('store');
    var stores = await collection.find(criteria).toArray();
    return stores;
  } catch (err) {
    logger.error('cannot find stores', err);
    throw err;
  }
}

async function getById(storeId) {
  try {
    const collection = await dbService.getCollection('store');
    const store = collection.findOne({ '_id': ObjectId(storeId) });
    return store;
  } catch (err) {
    logger.error(`while finding store ${storeId}`, err);
    throw err;
  }
}

async function remove(storeId) {
  try {
    const collection = await dbService.getCollection('store');
    await collection.deleteOne({ '_id': ObjectId(storeId) });
    return storeId;
  } catch (err) {
    logger.error(`cannot remove store ${storeId}`, err);
    throw err;
  }
}

async function add(store) {
  try {
    const collection = await dbService.getCollection('store');
    store.createdAt = ObjectId(store._id).getTimestamp();
    const addedStore = await collection.insertOne(store);
    return addedStore.ops[0];
  } catch (err) {
    logger.error('cannot insert store', err);
    throw err;
  }
}
async function update(store) {
  try {
    var id = ObjectId(store._id);
    delete store._id;
    const collection = await dbService.getCollection('store');

    await collection.updateOne({ '_id': id }, { $set: { ...store } });
    store._id = id;
    return store;
  } catch (err) {
    logger.error(`cannot update store ${store._id}`, err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  const criteria = {};

  // filter by title
  if (filterBy.title)
    criteria.title = { $regex: filterBy.title, $options: 'i' };

  // filter by description
  if (filterBy.description)
    criteria.description = { $regex: filterBy.description, $options: 'i' };

  //filter by isPopularGift
  if (filterBy.isPopularGift) {
    criteria.isPopularGift =
      filterBy.isPopularGift === 'true' ? { $eq: true } : { $eq: false };
  }
  // //filter by Price
  if (filterBy.price) {
    criteria.price = $or[({ $eq: filterBy.price }, { $lt: filterBy.price })];
  }

  //filter by tags
  if (filterBy.tags) {
    criteria.tags = { $in: filterBy.tags };
  }

  return criteria;
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
};

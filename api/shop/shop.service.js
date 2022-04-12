const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = {}, sort = {}) {
  try {
    const criteria = _buildCriteria(filterBy);

    const collection = await dbService.getCollection('shop');
    var shops = await collection.find(criteria).sort(sort).toArray();
    return shops;
  } catch (err) {
    logger.error('cannot find shops', err);
    throw err;
  }
}

async function getById(shopId) {
  try {
    const collection = await dbService.getCollection('shop');
    const shop = collection.findOne({ '_id': ObjectId(shopId) });
    return shop;
  } catch (err) {
    logger.error(`while finding shop ${shopId}`, err);
    throw err;
  }
}

async function remove(shopId) {
  try {
    const collection = await dbService.getCollection('shop');
    await collection.deleteOne({ '_id': ObjectId(shopId) });
    return shopId;
  } catch (err) {
    logger.error(`cannot remove shop ${shopId}`, err);
    throw err;
  }
}

async function add(shop) {
  try {
    const collection = await dbService.getCollection('shop');
    shop.createdAt = ObjectId(shop._id).getTimestamp();
    const addedShop = await collection.insertOne(shop);
    return addedShop.ops[0];
  } catch (err) {
    logger.error('cannot insert shop', err);
    throw err;
  }
}
async function update(shop) {
  try {
    var id = ObjectId(shop._id);
    delete shop._id;
    const collection = await dbService.getCollection('shop');

    await collection.updateOne({ '_id': id }, { $set: { ...shop } });
    shop._id = id;
    return shop;
  } catch (err) {
    logger.error(`cannot update shop ${shop._id}`, err);
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

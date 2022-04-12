const bugService = require('./bug.service.js');
const logger = require('../../services/logger.service');

// GET LIST
async function getBugs(req, res) {
  try {
    var queryParams = req.query;
    const bugs = await bugService.query(queryParams);
    res.json(bugs);
  } catch (err) {
    logger.error('Failed to get bugs', err);
    res.status(500).send({ err: 'Failed to get bugs' });
  }
}

// GET BY ID
async function getBugById(req, res) {
  try {
    const bugId = req.params.id;
    const bug = await bugService.getById(bugId);
    res.json(bug);
  } catch (err) {
    logger.error('Failed to get bug', err);
    res.status(500).send({ err: 'Failed to get bug' });
  }
}

// POST (add bug)
async function addBug(req, res) {
  try {
    const bug = req.body;
    const addedBug = await bugService.add(bug);
    console.log('addedBug', addedBug);
    res.json(addedBug);
  } catch (err) {
    logger.error('Failed to add bug', err);
    res.status(500).send({ err: 'Failed to add bug' });
  }
}

// PUT (Update bug)
async function updateBug(req, res) {
  try {
    const bug = req.body;
    console.log('bug', bug);
    const updatedBug = await bugService.update(bug);
    res.json(updatedBug);
  } catch (err) {
    logger.error('Failed to update bug', err);
    res.status(500).send({ err: 'Failed to update bug' });
  }
}

// DELETE (Remove bug)
async function removeBug(req, res) {
  try {
    const bugId = req.params.id;
    const removedId = await bugService.remove(bugId);
    res.send(removedId);
  } catch (err) {
    logger.error('Failed to remove bug', err);
    res.status(500).send({ err: 'Failed to remove bug' });
  }
}

module.exports = {
  getBugs,
  getBugById,
  addBug,
  updateBug,
  removeBug,
};

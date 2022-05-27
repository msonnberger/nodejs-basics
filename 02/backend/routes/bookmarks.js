const express = require('express');
const { readFile } = require('fs/promises');
const router = express.Router();

router.get('/bookmarks', async (req, res, next) => {
  try {
    const bookmarks = await readFile('./bookmarks.json');
    res.send(bookmarks);
  } catch {
    next({
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong :(',
    });
  }
});

module.exports = router;

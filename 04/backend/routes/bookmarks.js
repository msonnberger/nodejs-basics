const express = require('express');
const { readFile, writeFile } = require('fs/promises');
const crypto = require('crypto');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const bookmarks = await readFile('./bookmarks.json');
    res.json(JSON.parse(bookmarks));
  } catch {
    next({
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong :(',
    });
  }
});

router.post('/new', async (req, res, next) => {
  const API_KEY = '37b949ec123461664fdd22bee790c9ae';
  const API_URL = 'http://api.linkpreview.net/';

  try {
    const { url } = req.body;
    console.log(req.body);
    const apiRes = await fetch(`${API_URL}?key=${API_KEY}&q=${url}`);
    const linkPreview = await apiRes.json();
    linkPreview.id = crypto.randomUUID();
    linkPreview.liked = false;

    const bookmarks = await readFile('./bookmarks.json');
    const oldBookmarks = JSON.parse(bookmarks);
    const newBookmarks = [...oldBookmarks, linkPreview];
    await writeFile('./bookmarks.json', JSON.stringify(newBookmarks));

    res.json(linkPreview);
  } catch {
    next({
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong :(',
    });
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { like } = req.body;
    const { id } = req.params;

    const bookmarksFile = await readFile('./bookmarks.json');
    const bookmarks = JSON.parse(bookmarksFile);
    const bookmark = bookmarks.find((bookmark) => bookmark.id === id);
    bookmark.liked = like;

    await writeFile('./bookmarks.json', JSON.stringify(bookmarks));

    res.json(bookmark);
  } catch {
    next({
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong :(',
    });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const bookmarksFile = await readFile('./bookmarks.json');
    const bookmarks = JSON.parse(bookmarksFile);
    const index = bookmarks.findIndex((bookmark) => bookmark.id === id);
    bookmarks.splice(index, 1);

    await writeFile('./bookmarks.json', JSON.stringify(bookmarks));

    res.json(true);
  } catch {
    next({
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong :(',
    });
  }
});

module.exports = router;

const express = require('express');
const { readFile, writeFile } = require('fs/promises');
const crypto = require('crypto');
const Bookmark = require('../database/models/Bookmark');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.query().orderBy('created_at', 'desc');
    res.json(bookmarks);
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
    const apiRes = await fetch(`${API_URL}?key=${API_KEY}&q=${url}`);
    const linkPreview = await apiRes.json();
    const bookmark = await Bookmark.query().insert(linkPreview);

    res.json(bookmark);
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

    const bookmark = await Bookmark.query().findById(id).patch({ liked: like });

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

    await Bookmark.query().deleteById(id);

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

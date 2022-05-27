const express = require('express');
const app = express();
const bookmarksRouter = require('./routes/bookmarks');

const port = 5000;

app.use('/api', bookmarksRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

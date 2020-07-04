var express = require('express');
var router = express.Router();

/* GET /post*/
router.get('/', (req, res, next) => {
  res.send('INDEX /post');
});

/* GET /post/new */
router.get('/new', (req, res, next) => {
  res.send('NEW /post/new');
});

/* GET /post */
router.post('/', (req, res, next) => {
  res.send('create /post')
});

/* GET /post/show. */
router.get('/:id', (req, res, next) => {
  res.send('SHOW /post/:id');
});

/* GET /post/:id/edit*/
router.get('/:id/edit', (req, res, next) => {
  res.send('EDIT /post/:id/edit');
});

/* GET /post/:id */
router.put('/:id', (req, res, next) => {
  res.send('UPDATE /post/:id');
});

/* GET /post/remove */
router.delete('/:id', (req, res, next) => {
  res.send('DELETE /post/:id');
});

module.exports = router;

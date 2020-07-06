var express = require('express');
var router = express.Router({mergeParams: true});

/* GET post:id/reviews */
router.get('/', (req, res, next) => {
  res.send('INDEX /post/:id/reviews');
});

/* GET /post/:id/reviews*/
router.post('/', (req, res, next) => {
  res.send('CREATE /post/:id/reviews')
});

/* GET /post/:id/edit/:reviews_id/edit */
router.get('/:review_id/edit', (req, res, next) => {
  res.send('EDIT /post/:id/reviews/:review_id/edit');
});

/* GET /post/:id/:reviews_id */
router.put('/:review_id', (req, res, next) => {
  res.send('UPDATE /post/:id/reviews/:reviews_id');
});

/* GET /post/:id/reviews/reviews_id */
router.delete('/:review_id', (req, res, next) => {
  res.send('DELETE /post/:id/reviews/review_id');
});

module.exports = router;

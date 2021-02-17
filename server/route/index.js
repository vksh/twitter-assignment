const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ response: 'connection alive' }).status(200);
});

module.exports = router;

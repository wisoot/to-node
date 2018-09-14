const router = require('express').Router();
const items = require('./api/items');

router.post('/items', [], items.store);
router.put('/items/:id/finish', [], items.finish);
router.get('/items/finished', [], items.indexFinished);
router.get('/items/unfinished', [], items.indexUnfinished);
router.get('/items/:id', [], items.show);

module.exports = router;
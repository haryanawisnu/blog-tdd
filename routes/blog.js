var express = require('express');
var router = express.Router();
var blog = require('../controllers/blog');

router.get('/', blog.getall);
router.get('/:name', blog.getone);
router.post('/', blog.create);
router.delete('/:name', blog.delete);
router.put('/:name', blog.update);

module.exports = router

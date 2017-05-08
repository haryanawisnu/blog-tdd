var Blog = require('../models/blog');
module.exports = {
  getall: (req, res, next) => {
    Blog.find().exec(function(err, result) {
      if (result) {
        res.json(result);
      } else {
        res.send(`ERR getall :\n ${err}`);
      }
    });
  },
  getone: (req, res, next) => {
    let name = req.params.name
    Blog.findOne({
      'author.name': name
    }).exec(function(err, result) {
      if (result) {
        res.json(result);
      } else {
        res.send(`ERR getall :\n ${err}`);
      }
    });
  },
  create: (req, res, next) => {
    Blog.create({
      'blog.title': req.body.title,
      'blog.category': req.body.category,
      'blog.description': req.body.description,
      'blog.published': req.body.published,
      'blog.website': req.body.website,
      'blog.updated': req.body.updated,
      'author.name': req.body.name,
      'author.active': req.body.active,
      'author.email': req.body.email,
      'author.address': req.body.address
    }, function(error, result) {
      if (result) {
        res.send(result);
      } else {
        res.send(`ERR input :\n ${error}`);
      }
    });
  },
  delete: (req, res, next) => {
    let id = req.params.name;
    Blog.remove({
      'author.name': id
    }, function(err) {
      if (!err) {
        res.send(`Success remove with id ${id}`);
      } else {
        res.send(`ERR input :\n ${error}`);
      }
    });
  },
  update: (req, res, next) => {
    let id = req.params.name;
    Blog.findOne({
      'author.name': id
    }).exec(function(err, result) {
      if (result) {
        Blog.update({
          'author.name': id
        }, {
          $set: {
            'blog.title': req.body.title || result.blog.title,
            'blog.category': req.body.category || result.blog.category,
            'blog.description': req.body.description || result.blog.description,
            'blog.published': req.body.published || result.blog.published,
            'blog.website': req.body.website || result.blog.website,
            'blog.updated': req.body.updated || result.blog.updated,
            'author.name': req.body.name || result.blog.name,
            'author.active': req.body.active || result.blog.active,
            'author.email': req.body.email || result.blog.email,
            'author.address': req.body.address || result.blog.address
          }
        }, function(err, updt) {
          if (result) {
            res.json(updt);
          } else {
            res.send(`ERR Update :\n ${err}`);
          }
        });
      } else {
        res.send(`ERR getall :\n ${err}`);
      }
    });
  }
}

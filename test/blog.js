var chai = require('chai');
var chai_http = require('chai-http');
chai.use(chai_http);
const should = chai.should();
var server = require('../app');
var Blog = require('../models/blog')

describe('Blog', function() {

  beforeEach((done) => {
    var newBlog = new Blog({
      'blog.title': "Tutorial Express",
      'blog.category': "Code",
      'blog.description': "description description description description description description description description description description description description description description description description",
      'blog.published': new Date().toISOString(),
      'blog.website': "www.exprees.com",
      'blog.updated': new Date().toISOString(),
      'author.name': "Haryana wisnu",
      'author.active': new Date().toISOString(),
      'author.address': "JL merdeka aaaaaaaaaa aaaaaaa",
      'author.email': "wisnu@gmail.com"
    })
    newBlog.save((err, blog) => {
      done();
    })
  })

  afterEach((done) => {
    Blog.remove({}, (err) => {
      done();
    })
  })

  describe('GET:/blog', function() {
    it('get all data blog', function(done) {
      chai.request(server)
        .get('/blog')
        .end((err, result) => {
          result.should.have.status(200);
          result.body.should.be.a('array');
          result.body.length.should.equal(1);
          done();
        })
    });
  });

  describe('GET:/blog/:name', function() {
    it('get one data blog', function(done) {
      chai.request(server)
        .get('/blog/Haryana wisnu')
        .end((err, result) => {
          result.should.have.status(200);
          result.body.should.be.a('object');
          result.body.author.should.be.a('object');
          result.body.blog.should.be.a('object');
          done();
        })
    });
  });

  describe('POST:/blog', function() {
    it('create data blog', function(done) {
      chai.request(server)
        .post('/blog')
        .send({
          'title': "Tutorial Express",
          'category': "Code",
          'description': "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          'published': new Date(),
          'website': "www.exprees.com",
          'updated': new Date(),
          'name': "Haryana wisnu",
          'active': new Date(),
          'address': "JL merdeka aaaaaaaaaa aaaaaaa",
          'email': "wisnu@gmail.com"
        })
        .end((err, result) => {
          result.should.have.status(200);
          result.body.should.be.a('object');
          result.body.should.have.property('blog');
          result.body.should.have.property('author');
          result.body.blog.should.have.property('title');
          result.body.blog.should.have.property('category');
          result.body.blog.should.have.property('published');
          result.body.blog.should.have.property('website');
          result.body.blog.should.have.property('updated');
          result.body.author.should.have.property('name');
          result.body.author.should.have.property('active');
          result.body.author.should.have.property('address');
          result.body.author.email.should.to.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
          result.body.blog.website.should.to.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
          result.body.blog.description.should.to.have.length.above(50);
          result.body.author.address.should.to.have.length.above(20);
          done();
        })
    });
  });

  describe('PUT:/blog/:name', function() {
    it('update data blog', function(done) {
      chai.request(server)
        .put('/blog/Haryana wisnu')
        .send({
          'title': "temp",
          'category': "temp",
          'description': "temp",
          'published': "temp",
          'website': "temp",
          'updated': "temp",
          'name': "temp",
          'active': "temp",
          'address': "temp",
          'email': "temp"
        })
        .end((err, result) => {
          result.body.ok.should.equal(0);
          done();
        })
    });
  });

  describe('DELETE:/blog/:name', function() {
    it('delete data blog', function(done) {
      chai.request(server)
        .delete('/blog/Haryana wisnu')
        .end((err, result) => {
          result.text.should.equal('Success remove with id Haryana wisnu');
          done();
        })
    });
  });

});

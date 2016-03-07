var express = require('express');
var router = express.Router();

var entries = [
  {title:"February 10, 2016", body: "Today I learned source control using Git and GitHub", created_at: "2/10/16"},
  {title:"February 13, 2016", body: "Today I learned how to set up Heroku and use it to deploy a website",
  created_at: "2/13/16"}
];

/* READ all: GET entries listing. */
router.get('/', function(req, res, next) {
  res.render('entries/index', { title: 'Today I Learned', entries: entries });
});

/* CREATE entry form: GET /entries/new */
router.get('/new', function(req, res, next) {
  res.render('entries/new', {title: "Create New Entry"});
});

/*CREATE entry: POST /entries/ */
router.post('/', function(req, res, next) {
  entries.push(req.body);
  res.render('entries/index', { title: 'Today I Learned', entries: entries });
});

/* UPDATE entry form: GET /entries/1/edit */
router.get('/:id/edit', function(req, res, next) {
  res.render('entries/update',
  {
    title: 'Update An Entry',
    id: req.params.id,
    entry: entries[req.params.id]
  });
});

/* UPDATE entry: POST /entries/1 */
router.post('/:id', function(req, res, next) {
  entries[req.params.id] = req.body;
  res.render('entries/index',
  {
    title: 'Update An Entry',
    entries: entries
  });
});

/* DELETE entry: GET /entries/1/delete  */
router.get('/:id/delete', function(req, res, next) {
  var id = req.params.id
  entries = entries.slice(0,id).concat(entries.slice(id+1, entries.length));
  res.render('entries/index', { title: 'Today I Learned', entries: entries });
});

/* THIS NEEDS TO BE LAST or /new goes here rather than where it should */
/* READ one entry: GET /entries/0 */
router.get('/:id', function(req, res, next) {
  res.render('entries/entry', {title: "Today I Learned", entry: entries[req.params.id]});
});

module.exports = router;

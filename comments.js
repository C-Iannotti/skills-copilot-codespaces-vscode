// Create new web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var port = 8080;
var path = require('path');

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set static directory
app.use(express.static(path.join(__dirname, 'public')));

// Read file data
var data = fs.readFileSync('data.json');
var comments = JSON.parse(data);

// Create new web server
app.listen(port, function() {
    console.log('Server is running at port ' + port);
});

// Path: /
app.get('/', function(req, res) {
    res.render('home', {
        comments: comments
    });
});

// Path: /comment
app.get('/comment', function(req, res) {
    res.render('comment');
});

// Path: /comment
app.post('/comment', urlencodedParser, function(req, res) {
    comments.push(req.body);
    fs.writeFileSync('data.json', JSON.stringify(comments));
    res.redirect('/');
});

// Path: /delete/:id
app.get('/delete/:id', function(req, res) {
    comments.splice(req.params.id, 1);
    fs.writeFileSync('data.json', JSON.stringify(comments));
    res.redirect('/');
});
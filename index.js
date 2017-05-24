var express = require('express');
var http = require('http')
var app = express();
var mongoose = require('mongoose');
var user = require('./models/user').user;
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/express-demo');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {
    res.render('index', {title: 'index'})
})
app.get('/login', (req, res) => {
    res.render('login', {title: 'login'})
})
app.get('/loginout', (req, res) => {
    res.render('loginout', {title: 'loginout'})
})
app.post('/homepage', (req, res) => {
    var query_doc = {
        userid: req.body.userid,
        password: req.body.password
    };
    (function () {
        user.count(query_doc, (err, doc) => {
            if (doc == 1) {
                console.log(query_doc.userid + ": login success in " + new Date());
                res.render('homepage', {title: 'homepage'});
            } else {
                console.log(query_doc.userid + ": login failed in " + new Date());
                res.render('error', {title: 'login error'})
            }
        });
    })(query_doc);
})
var server = http.createServer(app);

server.listen(3000, () => {
    console.log('服务已启动')
})
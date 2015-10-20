'use strict';

var Contact = require('../models/Contact');
var NewsletterSignup = require('../models/NewsletterSignup');
var SuggestedCity = require('../models/SuggestedCity');
var aboutUs = require('../views/about')();
var fs = require('fs');
var $ = require('cheerio');
var bodyparser = require('body-parser');
var path = require('path');
var Sql = require('sequelize');
var sql = new Sql('events_page', 'eventsUser', 'p@ssw0rd1', {
  host: 'localhost',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = function (router) {
  router.use(bodyparser.json());
  router.use(bodyparser.urlencoded({
    extended: true
  }));

  // app.route('/about')
// .get(function (req, res) {
//   res.sendFile(path.join(__dirname, '/views/about.html'));
// });

// var about = $.load('/views/about.html');

router.route('/about')
  .get(function (req, res) {
    var start = new Date().getTime();
    console.log('start time : ', start);
    fs.readFile(path.join(__dirname, '../blank.html'), function (err, data) {
      var about = data.toString();
      var newAboutText = '<div class="container-div">' + aboutUs;
      if (err) {
        console.log(err);
      }
      sql.sync()
      .then(function () {
        SuggestedCity.findAll({where: {email: 'test@example.com'}})
        .then(function (data) {
            console.log('ELEM : ', data);
          $(data).each(function (i, elem) {
            newAboutText += '<h2>' + elem.city + '</h2>' + '<h2>' + elem.email + '</h2>';
          });
          // console.log(newAboutText);
          var newAbout = about.replace('<div class="container-div">', newAboutText);        
          // res.send(newAbout);
          res.json(data);
          var end = new Date().getTime();
          console.log('end time : ', end);
        })
        .error(function (err) {
          console.log(err);
          res.status(500).json({msg: 'internal server error'});
        });
      });
    });
    // console.log(about);
  });
  
  /*app.get('/about', function (req, res) {
      sql.sync()
      .then(function () {
        SuggestedCity.all()
        .then(function (data) {        
          res.json(data)
          var end = new Date().getTime();
          console.log('end time : ', end);
        })
        .error(function (err) {
          console.log(err);
          res.status(500).json({msg: 'internal server error'});
        })
      })
    });*/ 
};
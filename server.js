'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var time = new Date();
/*var Sql = require('sequelize');
var sql = new Sql('events_page', 'eventsUser', 'p@ssw0rd1', {
  host: 'localhost',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var mapRouter = express.Router();
var homeRouter = express.Router();
var latestNewsRouter = express.Router();
var findEventsRouter = express.Router();
var pastEventsRouter = express.Router();
var mediaRouter = express.Router();
var faqRouter = express.Router();
var meetTheTeamRouter = express.Router();
var contactRouter = express.Router();
var futureEventsRouter = express.Router();
var aboutRouter = express.Router();
var dbRouter = express.Router();
require('./routes/home-routes')(homeRouter);
require('./routes/world-map-routes')(mapRouter);
require('./routes/latest-news-routes')(latestNewsRouter);
require('./routes/find-an-event-routes')(findEventsRouter);
require('./routes/past-events-routes')(pastEventsRouter);
require('./routes/media-routes')(mediaRouter);
require('./routes/faq-routes')(faqRouter);
require('./routes/meet-the-team-routes')(meetTheTeamRouter);
require('./routes/contact-routes')(contactRouter);
require('./routes/future-events-routes')(futureEventsRouter);
require('./routes/about-routes')(aboutRouter);
require('./routes/db-routes')(dbRouter);


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.static(__dirname + '/'));
app.use('/', homeRouter);
app.use('/', mapRouter);
app.use('/', latestNewsRouter);
app.use('/', findEventsRouter);
app.use('/', pastEventsRouter);
app.use('/', mediaRouter);
app.use('/', faqRouter);
app.use('/', meetTheTeamRouter);
app.use('/', contactRouter);
app.use('/', futureEventsRouter);
app.use('/', aboutRouter);
app.use('/', dbRouter);

app.listen(port, function () {
	console.log('server started on port ' + port + ' at ' + time);
});

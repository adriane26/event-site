'use strict';

var Sql = require('sequelize');
/*var sql = new Sql('events_page', 'eventsUser', 'p@ssw0rd1', {
  host: 'localhost',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var sql = new Sql('InteropEventsDBTest', 'EventAdmin@interopeventstestserver', 'Event.4ever!', {
  host: 'interopeventstestserver.database.windows.net',
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  }
});

var SurveyAnswer = module.exports = sql.define('SurveyAnswer', {
	surveyQuestionId: Sql.INTEGER,
  question: Sql.TEXT,
	answer: Sql.TEXT,
  options: Sql.TEXT
})

SurveyAnswer.sync({force: false})
/*.then(function () {
	return SurveyAnswer.create({
		surveyQuestionId: 1,
		answer: '',
    question: ''
	})
})*/
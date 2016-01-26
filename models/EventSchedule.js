'use strict';

var Sql = require('sequelize');
/*var sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
var sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
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

var EventSchedule = module.exports = sql.define('EventSchedule', {
	eventId: Sql.INTEGER,
	scheduleDay: Sql.STRING,
	scheduleTime: Sql.STRING,
  description: Sql.TEXT,
  sessionStartTime: Sql.DATE,
  sessionEndTime: Sql.DATE,
  sessionTitle: Sql.STRING
});

// EventSchedule.sync({force: false});

// create table if it doesn't already exist ```({force: true})``` will cause the table to be deleted and created regardless of if it exists already

EventSchedule.sync({force: true})
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Friday',
      scheduleTime: '9 - 11',
      description: 'cheese tasting'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Friday',
      scheduleTime: '11 - 1',
      description: 'Lunch'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Friday',
      scheduleTime: '11 - 3',
      description: 'wine tasting'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Friday',
      scheduleTime: '3 - 6',
      description: 'beer tasting'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Saturday',
      scheduleTime: '9 - 11',
      description: 'Breakfast'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Saturday',
      scheduleTime: '11 - 1',
      description: 'Meat Tasting'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Saturday',
      scheduleTime: '11 - 3',
      description: 'Whiskey tasting'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Saturday',
      scheduleTime: '3 - 6',
      description: 'Gladiatorial Games'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Sunday',
      scheduleTime: '9 - 11',
      description: 'Meet with Dahli Lama'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Sunday',
      scheduleTime: '11 - 1',
      description: 'Vegatable tasting'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Sunday',
      scheduleTime: '11 - 3',
      description: 'Plan take over of world'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 1,
      scheduleDay: 'Sunday',
      scheduleTime: '3 - 6',
      description: 'watch Mad Max'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Tuesday',
      scheduleTime: '9:00-9:30',
      description: 'Keynote'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Tuesday',
      scheduleTime: '9:30-10:15',
      description: 'The Office Developer Opportunity'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Tuesday',
      scheduleTime: '10:15-11:00',
      description: 'Office Add-ins Intro and Development'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Tuesday',
      scheduleTime: '11:00-11:15',
      description: 'Break'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Tuesday',
      scheduleTime: '12:00-1:00',
      description: 'Lunch'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Tuesday',
      scheduleTime: '1:00-2:00',
      description: 'Office 365 APIs'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Tuesday',
      scheduleTime: '2:00-2:15',
      description: 'Break'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Tuesday',
      scheduleTime: '2:15-3:00',
      description: 'Data Platform Overview'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Tuesday',
      scheduleTime: '3:00-3:30',
      description: 'An Introduction to OData'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Tuesday',
      scheduleTime: '3:30-4:3-',
      description: 'Building OData Services'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Tuesday',
      scheduleTime: '4:30-5:00',
      description: 'Consuming OData Services: (.NET)'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Tuesday',
      scheduleTime: '5:00-5:30',
      description: 'Consuming OData Services (Java)'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Wednesday',
      scheduleTime: '9:00-9:30',
      description: 'Mail, Calendar, and Contacts REST Demonstration'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Wednesday',
      scheduleTime: '9:30-10:45',
      description: 'Microsoft Developer Program Sign-Up'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Wednesday',
      scheduleTime: '10:45-11:00',
      description: 'Break'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Wednesday',
      scheduleTime: '11:00-11:45',
      description: 'Exchange Web Services and Examples'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Wednesday',
      scheduleTime: '11:45-1:00',
      description: 'Lunch'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Wednesday',
      scheduleTime: '1:30-2:45',
      description: 'O365 Brainstorm & Hack Session'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Wednesday',
      scheduleTime: '2:45-3:00',
      description: 'Break'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Wednesday',
      scheduleTime: '3:00-3:30',
      description: 'Office Online Capture'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Wednesday',
      scheduleTime: '3:30-4:30',
      description: 'Overview of Microsoft File Formats'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 2,
      scheduleDay: 'Wednesday',
      scheduleTime: '3:30-4:30',
      description: 'Overview of Microsoft File Formats'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Wednesday',
      scheduleTime: '9am -10:30am',
      description: 'Presentations',
      sessionStartTime: new Date('2016-04-20:09:00:00'),
      sessionEndTime: new Date('2016-04-20:10:30:00'),
      sessionTitle: 'Presentations'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Wednesday',
      scheduleTime: '10:30-10:45 ',
      description: 'Break',
      sessionStartTime: new Date('2016-04-20:10:30:00'),
      sessionEndTime: new Date('2016-04-20:10:45:00'),
      sessionTitle: 'Break'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Wednesday',
      scheduleTime: '10:45- 12pm ',
      description: 'Presentations',
      sessionStartTime: new Date('2016-04-20:10:45:00'),
      sessionEndTime: new Date('2016-04-20:12:00:00'),
      sessionTitle: 'Break'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Wednesday',
      scheduleTime: '12-1pm ',
      description: 'Lunch',
      sessionStartTime: new Date('2016-04-20:12:00:00'),
      sessionEndTime: new Date('2016-04-20:13:00:00'),
      sessionTitle: 'Lunch'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Wednesday',
      scheduleTime: '1-2:30 ',
      description: 'Presentations & Hackathon',
      sessionStartTime: new Date('2016-04-20:13:00:00'),
      sessionEndTime: new Date('2016-04-20:14:30:00'),
      sessionTitle: 'Presentations & Hackathon'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Wednesday',
      scheduleTime: '2:30-2:45 ',
      description: 'Break',
      sessionStartTime: new Date('2016-04-20:14:30:00'),
      sessionEndTime: new Date('2016-04-20:14:45:00'),
      sessionTitle: 'Break'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Wednesday',
      scheduleTime: '2:45-5pm ',
      description: 'Presentations & Hackathon',
      sessionStartTime: new Date('2016-04-20:14:45:00'),
      sessionEndTime: new Date('2016-04-20:17:00:00'),
      sessionTitle: 'Presentations & Hackathon'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Thursday',
      scheduleTime: '9am -10:30am ',
      description: 'Presentations & Hackathon',
      sessionStartTime: new Date('2016-04-21:09:00:00'),
      sessionEndTime: new Date('2016-04-21:10:30:00'),
      sessionTitle: 'Presentations & Hackathon'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Thursday',
      scheduleTime: '10:30-10:45 ',
      description: 'Break',
      sessionStartTime: new Date('2016-04-21:10:30:00'),
      sessionEndTime: new Date('2016-04-21:10:45:00'),
      sessionTitle: 'Break'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Thursday',
      scheduleTime: '10:45- 12pm ',
      description: 'Presentations & Hackathon',
      sessionStartTime: new Date('2016-04-21:10:45:00'),
      sessionEndTime: new Date('2016-04-21:12:00:00'),
      sessionTitle: 'Presentations & Hackathon'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Thursday',
      scheduleTime: '12-1pm ',
      description: 'Lunch',
      sessionStartTime: new Date('2016-04-21:12:00:00'),
      sessionEndTime: new Date('2016-04-21:13:00:00'),
      sessionTitle: 'Lunch'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Thursday',
      scheduleTime: '1-2:30 ',
      description: 'Presentations & Hackathon',
      sessionStartTime: new Date('2016-04-21:13:00:00'),
      sessionEndTime: new Date('2016-04-21:14:30:00'),
      sessionTitle: 'Presentations & Hackathon'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Thursday',
      scheduleTime: '2:30-2:45 ',
      description: 'Break',
      sessionStartTime: new Date('2016-04-21:14:30:00'),
      sessionEndTime: new Date('2016-04-21:14:45:00'),
      sessionTitle: 'Break'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Thursday',
      scheduleTime: '2:45-4pm ',
      description: 'Presentations & Hackathon',
      sessionStartTime: new Date('2016-04-21:14:45:00'),
      sessionEndTime: new Date('2016-04-21:16:00:00'),
      sessionTitle: 'Presentations & Hackathon'
    });
  })
  .then(function () {
    return EventSchedule.create({
      eventId: 4,
      scheduleDay: 'Thursday',
      scheduleTime: '4-5pm ',
      description: 'Closing & Awards',
      sessionStartTime: new Date('2016-04-21:16:00:00'),
      sessionEndTime: new Date('2016-04-21:17:00:00'),
      sessionTitle: 'Closing & Awards'
    });
  });


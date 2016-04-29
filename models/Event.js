'use strict';

let fs = require('fs');
let path = require('path');

module.exports = function(sql, DataTypes) {

  return sql.define('Event', {
    eventName: DataTypes.STRING,
    eventRegistrationLink: DataTypes.STRING, //link to registrationfor event
    eventLocation: {
      type: DataTypes.STRING,
      set: function(val) {
        this.setDataValue('eventLocation', val.toLowerCase().replace(' ', '_'));
      }
    },
    eventContinent: DataTypes.ENUM('North America', 'South America', 'Africa', 'Asia', 'Europe', 'Oceania'),
    eventStartDate: DataTypes.DATE, //the start date...
    eventEndDate: DataTypes.DATE, // the end date...
    eventHeaderImage: DataTypes.TEXT, //link to header image
    eventHomepageImage: DataTypes.TEXT, //link to homepage image
    eventHighlightColor: DataTypes.TEXT, //what color to use to highlight the homepage
    eventFuturePageImage: DataTypes.TEXT, //image to appear on event slide on homepage
    eventFuturePageText: DataTypes.TEXT, //slide up text for future events page
  /*  eventSlideshowImage: {
      type: DataTypes.TEXT,
      unique: true,
      get: function () {
        return randomTabImages[Math.floor(Math.random() * randomTabImages.length)]
      }
    },*/ //image for front page slider
    eventSpeakers: DataTypes.STRING
  },
  {
    getterMethods   : {
      eventUrl: function () {
        let theEventLocation = this.getDataValue('eventLocation');
        let startDate = this.getDataValue('eventStartDate');
        let theUrl = theEventLocation.replace(/\W/g, '').toLowerCase() + '-' + startDate.getFullYear();
        return theEventLocation.replace(/\W/g, '').toLowerCase() + startDate.getFullYear();
      }/*,
      eventSlideshowImage: function () {
        let idVal = this.getDataValue('id');
        let imgIndex = Math.floor(idVal / randomTabImages.length);
        return randomTabImages[idVal - imgIndex];
      }*/
    }
  });


}

'use strict';

var fs = require('fs');
var path = require('path');
var Sql = require('sequelize');
var sql = new Sql(process.env.DB_LOCAL_NAME, process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASS, {
  host: process.env.DB_LOCAL_HOST,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
/*var sql = new Sql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
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
});*/

var randomTabImages = ['alt-slide-1.jpg', 'alt-slide-2.jpg', 'alt-slide-3.jpg', 'alt-slide-4.jpg', 'alt-slide-5.jpg', 'alt-slide-6.jpg'];
// var randomTabImages = ['alt-slide-1-large.jpg', 'alt-slide-2-large.jpg', 'alt-slide-3-large.jpg', 'alt-slide-4-large.jpg', 'alt-slide-5-large.jpg', 'alt-slide-6-large.jpg', 'alt-slide-7-large.jpg', 'alt-slide-8-large.jpg'];

var Event = module.exports = sql.define('Event', {
  eventName: Sql.STRING,
  eventRegistrationLink: Sql.STRING, //link to registrationfor event
  eventLocation: Sql.STRING,
  eventContinent: Sql.ENUM('North America', 'South America', 'Africa', 'Asia', 'Europe', 'Oceania'),
  eventStartDate: Sql.DATE, //the start date...
  eventEndDate: Sql.DATE, // the end date...
  eventHeaderImage: Sql.TEXT, //link to header image
  eventHomepageImage: Sql.TEXT, //link to homepage image
  eventHighlightColor: Sql.TEXT, //what color to use to highlight the homepage
  eventFuturePageImage: Sql.TEXT, //image to appear on event slide on homepage
  eventFuturePageText: Sql.TEXT, //slide up text for future events page
/*  eventSlideshowImage: {
    type: Sql.TEXT,
    unique: true,
    get: function () {
      return randomTabImages[Math.floor(Math.random() * randomTabImages.length)]
    }
  },*/ //image for front page slider
  homepageBulletOne: Sql.STRING,
  homepageBulletTwo: Sql.STRING,
  homepageBulletThree: Sql.STRING,
  eventSponsorsTab: Sql.TEXT, //copy for Sponsors Tab
  eventOverviewTab: Sql.TEXT, //copy for Overview Tab
  // travelTabMap: Sql.TEXT, //Bing Imap of location
  travelTabHeaderImage: Sql.TEXT, //image to appear above travel tabs
  travelVenueTab: Sql.TEXT, //copy for travel venue sub tab
  travelTravelTab: Sql.TEXT, //copy for trave travel sub tab
  travelAccomodationsTab: Sql.TEXT, //copy for travel accommodations sub tab
  travelTipsTab: Sql.TEXT, //copy for travel Tips and Tricks sub tab
  travelEatDrinkTab: Sql.TEXT, //copy for travel eat and drink sub tab
  eventMediaTab: Sql.TEXT, //copy for media tab
  eventTechnologiesTab: Sql.TEXT //Tab for technologies at event
},
{
  getterMethods   : {
    eventUrl: function () {
      var theEventLocation = this.getDataValue('eventLocation');
      var startDate = this.getDataValue('eventStartDate');
      var theUrl = theEventLocation.replace(/\W/g, '').toLowerCase() + '-' + startDate.getFullYear();
      return theEventLocation.replace(/\W/g, '').toLowerCase() + startDate.getFullYear();
    },
    eventSlideshowImage: function () {
      var idVal = this.getDataValue('id');
      var imgIndex = Math.floor(idVal / randomTabImages.length);
      return randomTabImages[idVal - imgIndex];
    }
  }
});


// create table if it doesn't already exist ```({force: true})``` will cause the table to be deleted and created regardless of if it exists already

/*Event.sync({force: true})
.then(function () {
  return Event.create({
  eventName: 'Storage Developer Conference 2',
  eventRegistrationLink: 'http://www.example.com',
  eventStartDate: new Date('2014-01-01:00:01:00'),
  eventEndDate: new Date('2014-01-04:23:59:00'),
  eventLocation: 'Santa Clara, CA',
  eventContinent: 'North America',
  eventHeaderImage: '2b98dc94-eabb-49a9-a419-3aaa25d540bc.jpg',
  eventHomepageImage: 'santa-clara-slide.jpg', 
  eventFuturePageImage: 'santa-clara-convention-center-2.jpg',
  eventFuturePageText: '<p>Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community.</p><p>Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.</p>',
  eventSlideshowImage: 'santa-clara-convention-center-2-homepage.jpg',
  homepageBulletOne: 'Persistent Memory',
  homepageBulletTwo: 'Object Drives',
  homepageBulletThree: 'SMR Drives',
  eventSponsorsTab: '<h2>2015 Sponsorship and Exhibitor Opportunities</h2><hr class="alt1" /><p>What a bounder fox hunting circus strongman arcu lip warmer Refined gentlemen robert winston east european, arcu lip warmer Fallen eyebrow clive dunn by jingo. east european what a bounder john cleese soup strainer robert winston hairy kiss. fox hunting timothy dalton Refined gentlemen what a bounder circus strongman, east european what a bounder robert winston circus strongman soup strainer hairy kiss. en time-warped cabbie what a bounder waiter lip warmer ding-dong clive dunn by jingo. timothy dalton louis xiii fox hunting arcu john cleese Refined gentlemen Fallen eyebrow? Devilish cad dolor sit amet cigars stiff upper lip funny walk, admiral funny walk cigars sportacus jolly good show david seaman devilish cad dolor sit amet stiff upper lip?</p><p>For more information on sponsorships or to find out why all our sponsors have the same logo, contact Yo Mama at <a href="mailto:yomama@example.com">yomama@example.com</a></p><hr class="alt1" /><h3>Platinum Sponsors</h3><div class="col_6"><img src="../../img/logo1.png"><h4>A Company</h4></div><div class="col_6"><img src="../../img/logo1.png"><h4>Another Company</h4></div><hr class="alt1" /><h3>Gold Sponsors</h3><div class="col_6"><img src="../../img/logo1.png"><h4>A Business</h4></div><div class="col_6"><img src="../../img/logo1.png"><h4>Another Business</h4></div><hr class="alt1" /><h3>Silver Sponsors</h3><div class="col_6"><img src="../../img/logo1.png"><h4>Old Biz</h4></div><div class="col_6"><img src="../../img/logo1.png"><h4>New Biz</h4></div>', //copy for Sponsors Tab
  eventOverviewTab: '<h2>Storage Developer Conference</h2><h3>Boudin beef ribs</h3><p>Short loin bacon spare ribs biltong boudin, filet mignon shank brisket beef ribs swine bresaola meatloaf shoulder picanha. Cow bresaola bacon flank kevin ribeye pancetta short loin beef shankle doner tenderloin.</p><p>Tongue shank ham hock pork chop kevin, ribeye fatback turducken ground round filet mignon kielbasa spare ribs short loin jerky alcatra.</p><h4>2015 Agenda is Now Available</h4><p>Swine strip steak tongue picanha, chuck alcatra shankle jerky pancetta capicola pork andouille. Ham hock shank salami sirloin t-bone tail. Jowl ham flank, strip steak turducken ham hock salami pig landjaeger shank. </p><ul><li>First Subject</li><li>Second Subject</li><li>Third Subject</li></ul><p>View the full agenda here and start planning now which sessions you will attend. It won\'t be an easy choice!</p>', //copy for Overview Tab
  // travelTabMap: '<div><iframe width="800" height="400" frameborder="0" src="http://www.bing.com/maps/embed/viewer.aspx?v=3&amp;cp=37.355740~-121.954987&amp;lvl=12&amp;w=800&amp;h=400&amp;sty=r&amp;typ=d&amp;pp=Santa%20Clara%2C%20CA~~37.355740~-121.954987&amp;ps=&amp;dir=0&amp;mkt=en-us&amp;src=O365&amp;form=BMEMJS"></iframe><div style="margin: 12px 0 0 0;"><a target="_blank" href="http://www.bing.com/maps/?cp=37.355740~-121.954987&amp;sty=r&amp;lvl=12&amp;sp=point.37.355740_-121.954987_Santa%20Clara%2C%20CA_&amp;mm_embed=map">View larger map</a>&nbsp; |&nbsp; <a target="_blank" href="http://www.bing.com/maps/?cp=37.355740~-121.954987&amp;sty=r&amp;lvl=12&amp;rtp=~pos.37.355740_-121.954987_Santa%20Clara%2C%20CA_&amp;mm_embed=dir">Get directions</a>&nbsp; |&nbsp; <a target="_blank" href="http://www.bing.com/maps/?cp=q6sbtw4v3c8c&amp;sty=b&amp;lvl=18&amp;sp=point.37.355740_-121.954987_Santa%20Clara%2C%20CA_&amp;mm_embed=be">View bird\'s eye</a></div></div>', //Bing Imap of location
  travelTabHeaderImage: 'santa-clara-convention-center.jpg',
  travelVenueTab: '<h2>Hello</h2><p>Ancient alien contend DNA manipulation the vedas ancient religions flying vessels, extraterrestrial spaceships clearly Chariot of the Gods Indian texts, Giorgio technology Easter island Ezekiel alien burmuta triangle SETI. Gods sun disc mercury Nazca lines astronaut pyramids, portal burmuta triangle clearly space brothers sightings, Sumerian texts UFO ancient alien theorists.</p>', //copy for travel venue sub tab
  travelTravelTab: '<h2>Travel Tab</h2><p>Ancient alien extraterrestrial sanskrit Mahabharata vortex UFO aircraft Vymaanika-Shaastra, evidence ancient civilization sky people choral castle, clearly grey UFO Machu Picchu Easter island. Ancient religions sun disc mercury legendary times, I know it sounds crazy... Petroglyph contend clearly space time helicopter heiroglyph. Chariot of the Gods spaceships, Annunaki ancient religions.</p>', //copy for trave travel sub tab
  travelAccomodationsTab: '<h2>Accommodations Tab</h2><p>Ancient alien sightings Easter island DNA manipulation, otherworldly visitors earth mound Indian texts, burmuta triangle ancient religions contend. Helicopter heiroglyph choral castle evidence targeted mutation otherworldly visitors ancient god, sanskrit cover up petroglyph ancient alien theorists Mahabharata, aircraft vortex the vedas pre-colonial aerodynamics ancient god. Flying vessels crystal skull, Mayan.</p>', //copy for travel accommodations sub tab
  travelTipsTab: '<h2>Tips Tab</h2><p>We need to neutralize the homing signal. Each unit has total environmental control, gravity, temperature, atmosphere, light, in a protective field. Sensors show energy readings in your area. We had a forced chamber explosion in the resonator coil. Field strength has increased by 3,000 percent.</p>', //copy for travel Tips and Tricks sub tab
  travelEatDrinkTab: '<h2>Eat & Drink</h2><p>Do cupidatat aliquip ribeye meatball beef ribs. Cillum meatloaf beef, filet mignon ham hock lorem culpa. Sirloin laboris dolore shank, pork belly aliquip cillum. Excepteur lorem beef jerky doner.</p>', //copy for travel eat and drink sub tab
  eventMediaTab: 'Produced since 1998, Storage Developer Conference (SDC) 2015 is scheduled for September 21-24, 2015 in Santa Clara, CA, and is again expected to attract more than 400 developers, technical professionals, and engineers from the worldwide storage community. Attend and learn about leading storage development topics including File Systems, Software Defined Storage, SMB, Security, Performance, and more.' //copy for media tab
  });
})
.then(function () {
  return Event.create({
  eventName: 'Shanghai Interop Dev Days 2015',
  // eventRegistrationLink: , //link to registrationfor event
  eventLocation: 'Shanghai',
  eventContinent: 'Asia',
  eventStartDate: new Date('2015-10-21T08:00:00'), //the start date...
  eventEndDate: new Date('2015-10-22T08:00:00'), // the end date...
  eventHeaderImage: '2b98dc94-eabb-49a9-a419-3aaa25d540bc.jpg',
  eventHomepageImage: 'shanghai-slide.jpg', 
  eventFuturePageImage: 'shanghai-2015-future-page.jpg', //image to appear on event slide on homepage
  eventFuturePageText: '<p>Shanghai was the first city to host Interop Dev Days and they continue to be one of the most important hubs of innovation with Microsoft products.</p><p>Dev Days focuses on Microsoft development opportunities for professional, independent, and student developers. Join us and start innovating with Microsoft!</p>', //slide up text for future events page
  // eventSlideshowImage: 'shanghai-2015-slideshow.jpg', //image for front page slider
  homepageBulletOne: 'O365 APIs',
  homepageBulletTwo: 'Word, Excel, Outlook, & PowerPoint Add-ins',
  homepageBulletThree: 'Exchange and SharePoint protocols',
  // eventSponsorsTab: Sql.TEXT, //copy for Sponsors Tab
  eventOverviewTab: '<h2>Shanghai Interop Dev Days 2015</h2><p>Shanghai was the first city to host Interop Dev Days. Different from the traditional Plugfest, Dev Days focuses on Microsoft development opportunities for professional, independent, and student developers. Interop Dev Days highlights the opportunities of developing with Office 365. In addition to familiar topics such as O365 development and Open Specifications, OData played a crucial role in Shanghai’s Dev Days, illustrating the value in creating and using interoperable RESTful APIs. The event offered a full range of presentations, live demonstrations, and Q&A sessions. Attendees also received one-on-one assistance and a free Microsoft developer account.</p><p>The combination of O365 development, OData, and the traditional protocol implementation allowed for Interop Dev Days to reach a new audience, introduce fresh content, and explore a different event structure. Sessions included step-by-step instructions for setting up an O365 developer account, an interactive Office Add-in brainstorm session, and an Office dev hack session. Shanghai Interop Dev Days gave attendees a well-rounded experience from brainstorming, to building, to completing a product. Engaged, enthusiastic attendees actively developed with Office 365, created tangible results, and built stronger relationships with Microsoft.</p>', 
  // travelTabMap: Sql.TEXT, //Bing Imap of location
  // travelTabHeaderImage: Sql.TEXT, //image to appear above travel tabs
  // travelVenueTab: Sql.TEXT, //copy for travel venue sub tab
  // travelTravelTab: Sql.TEXT, //copy for trave travel sub tab
  // travelAccomodationsTab: Sql.TEXT, //copy for travel accommodations sub tab
  // travelTipsTab: Sql.TEXT, //copy for travel Tips and Tricks sub tab
  // travelEatDrinkTab: Sql.TEXT, //copy for travel eat and drink sub tab
  // eventMediaTab: Sql.TEXT //copy for media tab
  });
})
.then(function () {
  return Event.create({
    eventName: 'DevDays Asia 2016 @Taipei',
    eventStartDate: new Date('2016-04-19:08:00:00'),
    eventEndDate: new Date('2016-04-21:23:00:00'),
    eventLocation: 'Taipei',
    eventContinent: 'Asia',
    eventHeaderImage: 'TAIPEIHeader.png',
    eventHomepageImage: 'TAIPEIHeader.png',
    eventHighlightColor: '#4668c5',
    // eventFuturePageImage: Sql.TEXT, //image to appear on event slide on homepage
    // eventFuturePageText: Sql.TEXT, //slide up text for future events page
    // eventSlideshowImage: 'taipei-sample-slideshow-img.jpg', //image for front page slider
    homepageBulletOne: 'SQL Serve',
    homepageBulletTwo: 'PowerBI',
    homepageBulletThree: 'Big Data Stores, and Data Analytics',
    // eventSponsorsTab: Sql.TEXT, //copy for Sponsors Tab
    eventOverviewTab: '<h2>DevDays Asia 2016 @Taipei</h2><h4 class="center">Taipei, Taiwan - April 19 - 21, 2016</h4><p>Microsoft Office and Data Platform Interoperability teams present the largest Microsoft open technology event in Asia: DevDays Asia @ Taipei. DevDays Asia @ Taipei introduces the latest technologies from Microsoft including Office, Machine Learning, Cortana Analytics Suite, Power BI, and SQL Server.</p><p>Attendees can also look forward to a Microsoft “HaOkathon,” a hackathon to allow developers to use what they learn during to event to build socially beneficial technologies to make a difference in their local communities. The best hacks will be awarded with a variety of prizes</p><h5>Where: Taipei, Taiwan</h5><h5>Registration: Coming soon!</h5><h5>Cost: Free</h5><h5>Contact us with questions at <a href="mailto:plugfests@microsoft.com">plugfests@microsoft.com</a></h5><br />', //copy for Overview Tab
    // travelTabMap: Sql.TEXT, //Bing Imap of location
    // travelTabHeaderImage: Sql.TEXT, //image to appear above travel tabs
    // travelVenueTab: Sql.TEXT, //copy for travel venue sub tab
    // travelTravelTab: Sql.TEXT, //copy for trave travel sub tab
    // travelAccomodationsTab: Sql.TEXT, //copy for travel accommodations sub tab
    // travelTipsTab: Sql.TEXT, //copy for travel Tips and Tricks sub tab
    // travelEatDrinkTab: Sql.TEXT, //copy for travel eat and drink sub tab
    // eventMediaTab: Sql.TEXT, //copy for media tab
    eventTechnologiesTab: '<h4>Office 365</h4><p>Want to reach more than 1 billion users worldwide?! Learn the potential of connecting to Office 365 services. Build and sell apps that extend the most widely used productivity platform on the planet and understand the opportunity Office 365 holds. Find out about the latest product offerings from Office and the developer opportunities that are available.</p><ul>  <li>Build Office Add-ins</li> <li>Office 365 Unified/Graph API</li> <li>Mail, Calendar, and Contacts REST</li>  <li>Office Online Integration</li></ul><h3>Open Specifications and Interoperability</h3><p>Microsoft is committed to interoperability! Take a look at the expansive landscape of protocol documentation, available protocol tools, and customer engagement opportunities that are available to implementers and developers looking to connect with Microsoft clients and servers.</p><ul> <li>Exchange Protocols</li> <li>Exchange ActiveSync protocols and documentation</li>  <li>Exchange Web Services (EWS)</li>  <li>EWS Managed API</li></ul><h3>Microsoft File Formats</h3><p>Learn about the most commonly used file formats supported by Microsoft Office applications.</p><ul>  <li>Office Open XML</li>  <li>Open Document Format</li> <li>Binary File Format</li></ul><h3>What’s new with Office</h3><p>Learn about the newest service offerings and products from Office</p><ul> <li>Sway</li> <li>Delve</li>  <li>Lens</li> <li>Mix</li></ul><h3>Data Platform</h3><p>Find out about the latest products in Data Platforms</p><ul>  <li>SQL Server</li> <li>PowerBI</li>  <li>Cortana Analytics</li></ul><h3>Machine Learning and Data Analytics</h3><p>Review the capabilities of Microsoft\'s Data Tools</p><ul> <li>Machine Learning</li> <li>Hadoop</li> <li>Distributed Analytics</li>  <li>Complex Event Processing</li></ul>'
  });
})
.then(function () {
  return Event.create({
  eventName: 'Extend Conference',
  // eventRegistrationLink: , //link to registrationfor event
  eventLocation: 'Paris',
  eventContinent: 'Europe',
  eventStartDate: new Date('2016-05-11:00:00:01'), //the start date...
  eventEndDate: new Date('2016-05-12:23:59:00'), // the end date...
  eventHeaderImage: 'ExtendWebsiteHeader.png', //link to header image
  eventHomepageImage: 'ExtendWebsiteHeader.png', 
  // eventFuturePageImage: Sql.TEXT, //image to appear on event slide on homepage
  // eventFuturePageText: Sql.TEXT, //slide up text for future events page
  // eventSlideshowImage: Sql.TEXT, //image for front page slider
  // homepageBulletOne: Sql.STRING,
  // homepageBulletTwo: Sql.STRING,
  // homepageBulletThree: Sql.STRING,
  // eventSponsorsTab: Sql.TEXT, //copy for Sponsors Tab
  eventOverviewTab: '<h2>Extend Conference</h2><h4 class="center">Paris, France - May 11 - 12, 2016</h4><p>Microsoft Office and Data Platform Interoperability teams are pleased to announce Extend in Paris from May 11-12, 2016. Microsoft will present its latest updates about Office, Machine Learning, Cortana Analytics Suite, Power BI, and SQL Server. Microsoft will decide topics beforehand but let the public choose the context of the content. Microsoft and event startup, La Reserve,  let attendees choose the content for an, "experience similar to what one might call crowd conferencing; a participative conference of a new kind where the public is the key player" (Julien Kerihuel, La Reserve founder).</p><p>Attendees can look forward to presentations from subject matter experts, interactive developer sessions and one-on-one collaborations with Microsoft engineers. Extend 2016 will include evening mixers and social hour with other attendees and Microsoft engineers.</p><h5>Where: Paris, France</h5><h5>When: May 11 - 12, 2016</h5><h5>Who: Developers building solutions that leverage Office, SharePoint, and SQL</h5><h5>Registration: Contact <a href="mailto:plugfests@microsoft.com">plugfests@microsoft.com</a> for eligibility</h5><h5>Cost: Free</h5><h5>Contact us with questions at <a href="mailto:plugfests@microsoft.com">plugfests@microsoft.com</a></h5><br />', //copy for Overview Tab
  // travelTabMap: Sql.TEXT, //Bing Imap of location
  // travelTabHeaderImage: Sql.TEXT, //image to appear above travel tabs
  // travelVenueTab: Sql.TEXT, //copy for travel venue sub tab
  // travelTravelTab: Sql.TEXT, //copy for trave travel sub tab
  // travelAccomodationsTab: Sql.TEXT, //copy for travel accommodations sub tab
  // travelTipsTab: Sql.TEXT, //copy for travel Tips and Tricks sub tab
  // travelEatDrinkTab: Sql.TEXT, //copy for travel eat and drink sub tab
  // eventMediaTab: Sql.TEXT, //copy for media tab
  eventTechnologiesTab: '<ul><li><h4>Microsoft Office </h4></li><li><h4>Office365 </h4></li><li><h4>Office 365 Unified API </h4></li><li><h4>Office Add-ins </h4></li><li><h4>Mail, Calendar + Contacts </h4></li><li><h4>Interoperability + Open Specifications </h4></li><li><h4>Exchange Protocols </h4></li><li><h4>Cloud + Enterprise </h4></li><li><h4>REST APIs </h4></li><li><h4>OData </h4></li><li><h4>Cortana Analytics Suite </h4></li><li><h4>Power BI </h4></li><li><h4>SQL Server </h4></li><li><h4>Big Data Stores </h4></li><li><h4>Machine Learning & Data Analytics </h4></li></ul>'
  });
})
.then(function () {
  return Event.create({
  eventName: 'Redmond Protocols Plugfest',
  // eventRegistrationLink: Sql.STRING, //link to registrationfor event
  eventLocation: 'Redmond',
  eventContinent: 'North America',
  eventStartDate: new Date('2016-06-13:00:01:00'), //the start date...
  eventEndDate: new Date('2016-06-17:23:59:00'), // the end date...
  eventHeaderImage: 'Redmond-Header.png', //link to header image
  eventHomepageImage: 'Redmond-Header.png',
  // eventFuturePageImage: Sql.TEXT, //image to appear on event slide on homepage
  // eventFuturePageText: Sql.TEXT, //slide up text for future events page
  // eventSlideshowImage: Sql.TEXT, //image for front page slider
  // homepageBulletOne: Sql.STRING,
  // homepageBulletTwo: Sql.STRING,
  // homepageBulletThree: Sql.STRING,
  // eventSponsorsTab: Sql.TEXT, //copy for Sponsors Tab
  eventOverviewTab: '<h5>Redmond Protocols Plugfest:</h5><p>5-day Microsoft event centered around Open Specifications, interoperability, Extensibility and protocol test tools. Attendees will learn more about interoperability within Microsoft Office, Exchange, SharePoint, Windows and SQL Server.</p><h5>Windows Interoperability (IO) Lab:</h5><p>The Windows Interoperability (IO) Lab is an excellent opportunity to test your implementation with Microsoft protocol test suites.   During the IO lab you have the opportunity to directly engage with Windows Protocol Support, Test Suite Development, and Windows development team as well as network with other professionals from all over the world.</p><h5>Where: Microsoft headquarters in Redmond, Washington</h5><h5>When:</h5><h5 style="text-indent: 20px">Redmond Protocols Plugfest: June 13-17, 2016</h5><h5 style="text-indent: 20px">Windows IO Lab: June 20-24, 2016</h5><h5>Who: Developers building solutions that leverage Office, Exchange, SharePoint, Windows, or SQL.</h5><h5>Registration: Coming soon!</h5><h5>Cost: Free</h5><h5>Contact us with questions at <a href="mailto:plugfests@microsoft.com">plugfests@microsoft.com</a></h5><br />', //copy for Overview Tab
  // travelTabMap: Sql.TEXT, //Bing Imap of location
  // travelTabHeaderImage: Sql.TEXT, //image to appear above travel tabs
  // travelVenueTab: Sql.TEXT, //copy for travel venue sub tab
  // travelTravelTab: Sql.TEXT, //copy for trave travel sub tab
  // travelAccomodationsTab: Sql.TEXT, //copy for travel accommodations sub tab
  // travelTipsTab: Sql.TEXT, //copy for travel Tips and Tricks sub tab
  // travelEatDrinkTab: Sql.TEXT, //copy for travel eat and drink sub tab
  // eventMediaTab: Sql.TEXT, //copy for media tab
  eventTechnologiesTab: '<ul><li><h4>What\'s New in Office </h4></l1><li><h4>Open Specifications + Interoperability </h4></l1><li><h4>Protocol Test Suites </h4></l1><li><h4>Mail Sim </h4></l1><li><h4>Microsoft Big Data </h4></l1><li><h4>Office Parsers </h4></l1><li><h4>Microsoft Cloud Foundations </h4></l1><li><h4>OData </h4></l1><li><h4>Exchange </h4></l1><li><h4>SharePoint </h4></l1><li><h4>File Formats </h4></l1><li><h4>Mail, Calendar + Contacts </h4></l1><li><h4>WOPI </h4></l1><li><h4>HyperV SMB3 Storage </h4></l1></ul>'
  });
});*/


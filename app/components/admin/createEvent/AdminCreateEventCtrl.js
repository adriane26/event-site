'use strict';
// require('tinymce');
const AdminCreateEventCtrl = (app) => {
  app.controller('AdminCreateEventCtrl', ['$rootScope', '$scope', '$http', 'Upload', '$window', 'createEventRESTResource', ($rootScope, $scope, $http, Upload, $window, resource) => {
    require('angular-ui-tinymce');
		$scope.errors = [];
		$scope.theEvents = [];
		$scope.theSpeakers = [];
		$scope.newEvent = {};
		$scope.hideModal = true;
    $scope.hideVenueModal = true;
    $scope.hideEventPreview = true;
    $scope.hideImageModal = true;
    $scope.speakersAdded = 0;
    $scope.displaySpeakerDivStyle = false;
    $scope.previewSpeakers = [];

    /*$scope.tinymceOptions = { 
      height: 500,
      theme: 'modern',
      automatic_uploads: true,
      plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table contextmenu directionality',
      'emoticons template paste textcolor colorpicker textpattern imagetools',
      'textcolor colorpicker'
      ],
      paste_data_images: true,
      inline: false,
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | link image',
      content_css: [
        '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
        '//www.tinymce.com/css/codepen.min.css'
      ]
    };*/

    let DataForEditingEvents = resource();

    if ($scope.newEvent.newEventName && $scope.newEvent.eventAboutTabText) {
      $scope.displaySpeakerDivStyle = false;

    }

    $scope.getEvents = () => {

      DataForEditingEvents.getAllEvents( (err, data) => {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve events'});
        };
        
        $scope.theEvents = data;
      })
      
    
    };

    $scope.getAllSpeakers = () => {

      DataForEditingEvents.getAllSpeakers( (err, speakers) => {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve speakers'});
        }

        $scope.theSpeakers = speakers;
      })
    };

    $scope.createNewEvent = (newEventData) => {
      if ($rootScope.eventHeaderImg.name) {
        newEventData.newEventHeaderImage = $rootScope.eventHeaderImg.name ? $rootScope.eventHeaderImg.size + '-' + $rootScope.eventHeaderImg.name : '';
      }
      if ($rootScope.eventVenueImg.name) {
        newEventData.newEventVenueImg = $rootScope.eventVenueImg.name ? $rootScope.eventVenueImg.size + '-' + $rootScope.eventVenueImg.name : '';
      }

      DataForEditingEvents.createEvent(newEventData, (err, data) => {
        if (err) {
          $scope.errors.push({msg: 'could not save newEvent: ' + $scope.newEvent.eventName});
        }
        if (!err) {

          $scope.newEvent = {};
          $rootScope.eventHeaderImg = undefined;
          $rootScope.eventVenueImg = undefined;

          $window.location.reload();
          alert('Event Saved');
        }
      });
    };

    $scope.closeModalWindow = () => {
      $scope.hideModal = !$scope.hideModal;
    };
    $scope.closeVenueModal = () => {
      $scope.hideVenueModal = !$scope.hideVenueModal;
    };
    $scope.toggleImageModal = () => {
      $scope.hideImageModal = !$scope.hideImageModal;
    };

    $scope.toggleEventPreview = () => {
      $scope.hideEventPreview = !$scope.hideEventPreview;
    };

    $scope.getPreviewSpeakers = (theSpeakers) => {
      if ($scope.newEvent.speakers) {
        $scope.displaySpeakerDivStyle = true;
        let keysArr = Object.keys($scope.newEvent.speakers);
        return $scope.theSpeakers.filter( (speaker) => {
          $scope.speakersAdded++;
          return keysArr.indexOf(speaker.id.toString()) !== -1 && $scope.newEvent.speakers[speaker.id] !== null;
        });
        
      }
    }

    $scope.tinymceModel = 'Initial content';

    $scope.getContent = function() {
      console.log('Editor content:', $scope.tinymceModel);
    };
  
    $scope.setContent = function() {
      $scope.tinymceModel = 'Time: ' + (new Date());
    };
  
    $scope.tinymceOptions = {
      plugins: 'link image code',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    };

	}])
}

module.exports = AdminCreateEventCtrl;
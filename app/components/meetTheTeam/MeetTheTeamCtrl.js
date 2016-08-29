'use strict';

const MeetTheTeamCtrl = (app) => {
	app.controller('MeetTheTeamCtrl', ['$scope', '$http', '$sce', 'meetTheTeamRESTResource', function($scope, $http, $sce, resource) {
		$scope.errors = [];
		$scope.teamMembers = [];

		let TeamMember = resource();

		$scope.getTeamMembers = () => {

			TeamMember.getMeetTheTeamSpeakers(function (err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve team members'});
        };
        
        $scope.teamMembers = data;
        for (let i = 0, len = $scope.teamMembers.length; i < len; i++) {
        	$scope.teamMembers[i].contactDescription = $sce.trustAsHtml($scope.teamMembers[i].contactDescription);
        	$scope.teamMembers[i].headShot = 'app/uploads/' + $scope.teamMembers[i].headShot;
        }
      })
			
		
		}
	}])
}

module.exports = MeetTheTeamCtrl;
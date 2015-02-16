'use strict';

//angular.module('mean.gmap').controller('GmapController', ['$scope', 'Global', 'Gmap','$timeout',
//  function($scope, Global, Gmap,$timeout) {
//    $scope.global = Global;
//    $scope.package = {
//      name: 'gmap'
//    };
//
//// map invocation
//  $scope.mymap = {
//    	center: { // Wash DC
//        	latitude: 38.9304446 ,
//        	longitude: -77.4357575
//    	},
//      dragging: false,
//      refresh:true,
//    	zoom: 10
//	};
//
// $scope.mapinst = {
//  events: {
//    tilesloaded: function (map) {
//      $scope.$apply(function () {
//        $log.info('this is the map instance', map);z
//      });
//    }
//  }
//  }
//  // Couldn't figure out how panTo shuould work with angular-google-maps so mimicked
//  // - an ugly replacement with $timeout.
//  $scope.uglyPan = function (){
//    console.log("uglyPan!");
//    console.log($scope.newcenter);
//    $scope.mymap.center = $scope.newcenter;
//    $scope.mymap.zoom =10;
//  }
//
//  $scope.addMarker= function(location){
//    var markerCoords = {
//      latitude: location.k,
//      longitude: location.B
//    };
//
//    $scope.markers.push({coords: markerCoords});
//    $scope.mymap.zoom = 2;
//    $scope.newcenter = markerCoords;
//    $timeout($scope.uglyPan,500);
//  }
//
//
//// Multiple marker support
//  	$scope.options = {scrollwheel: false};
//  	$scope.markers = [{
//            id:0,
//            coords: { // Jerusalem
//                latitude: 31.8615237,
//                longitude: 35.1761319
//            },
//        },
//        {
//            id:1,
//            coords: { // Bney Brak
//                latitude: 32.0926177,
//                longitude: 34.8392055
//            },
//            
//        }
//   	];
//  }
//]);


//google map
angular.module('mean.gmap').controller('GmapController', ['MarkerCreatorService', '$scope', function (MarkerCreatorService, $scope) {
  

        MarkerCreatorService.createByCoords(39, -77, function (marker) {
            marker.options.labelContent = 'Washington DC';
            $scope.autentiaMarker = marker;
        });
        
        $scope.address = '';

        $scope.map = {
            center: {
                latitude: $scope.autentiaMarker.latitude,
                longitude: $scope.autentiaMarker.longitude
            },
            zoom: 12,
            markers: [],
            control: {},
            options: {
                scrollwheel: false
            }
        };

        $scope.map.markers.push($scope.autentiaMarker);

        $scope.addCurrentLocation = function () {
            MarkerCreatorService.createByCurrentLocation(function (marker) {
                marker.options.labelContent = 'You´re here';
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        };
        
        $scope.addAddress = function() {
            var address = $scope.address;
            // console.log(address);
            //var address = "29576";
            $scope.message = "hellooooo";
            console.log("address is " + address);
            if (address !== '') {
                MarkerCreatorService.createByAddress(address, function(marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
            }
        };

        function refresh(marker) {
            $scope.map.control.refresh({latitude: marker.latitude, longitude: marker.longitude});
        }

    }]);

// Google map provider

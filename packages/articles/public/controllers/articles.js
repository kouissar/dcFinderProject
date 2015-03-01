'use strict';

angular.module('mean.articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', '$log', 'Global',  'Articles',
  function($scope, $stateParams, $location, $log, Global, Articles) {

  
  // Time Picker
  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

 $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.etime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.etime);
  };

  $scope.clear = function() {
    $scope.etime = null;
  };
  
    $scope.global = Global;

    $scope.hasAuthorization = function(article) {
      if (!article || !article.user) return false;
      return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var article = new Articles({
          title: this.title,
          content: this.content,
          edate: this.edate,
          etime: this.etime,
          eplace: this.eplace
        });
        article.$save(function(response) {
          $location.path('articles/' + response._id);
        });

        this.title = '';
        this.content = '';
        this.edate = '';
        this.etime = '';
        this.eplace = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(article) {
      if (article) {
        article.$remove(function(response) {
          for (var i in $scope.articles) {
            if ($scope.articles[i] === article) {
              $scope.articles.splice(i, 1);
            }
          }
          $location.path('articles');
        });
      } else {
        $scope.article.$remove(function(response) {
          $location.path('articles');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var article = $scope.article;
        if (!article.updated) {
          article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
          $location.path('articles/' + article._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Articles.query(function(articles) {
        $scope.articles = articles;
      });
    };

    $scope.findOne = function() {
      Articles.get({
        articleId: $stateParams.articleId
      }, function(article) {
        $scope.article = article;
      });
    };
  }
]);

//weather
angular.module('mean.articles').controller('weatherController', function($scope, $http) {
  $scope.iconBaseUrl = 'http://openweathermap.org/img/w/';
  
  var zip = '20004';
  var base = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
  var unit = 'imperial';
  // var zip = firstName;
  var days = '7';
  var url = base + zip + ',USA&mode=json&units=' + unit + '&cnt=' + days;
  // example URL "http://api.openweathermap.org/data/2.5/forecast/daily?q=20876,USA&mode=json&units=imperial&cnt=7"
  $http.get(url).success(function(response) {
    $scope.names = response;
  });
  // Get icon image url
  $scope.getIconImageUrl = function(iconName) {
    return (iconName ? $scope.iconBaseUrl + iconName + '.png' : '');
  };
});

//filter
angular.module('mean.articles').filter('timestampToDate', function() {
  return function(timestamp) {
    var date = new Date(timestamp * 1000);
    var dateObject = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    return dateObject;
  };
});

//prayer controller
angular.module('mean.articles').controller(
        'salatController',
        function($scope) {
          $scope.message = 'Trying to make this work, if it does, it will be awesome!';
          var date = new Date(); // today
          var prayTimes = new PrayTimes();
          var times=prayTimes.getTimes(date, [ 39, -77 ], -5);
          var list = [ 'Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Midnight' ];

          var html = '<table class="table table-hover" id="timetable">';
          html += '<tr class="success"><th colspan="2">' + date.toLocaleDateString() + '</th></tr>';
          for ( var i in list) {
            html += '<tr><td><b>' + list[i] + '</b></td>';
            html += '<td>' + times[list[i].toLowerCase()] + '</td></tr>';
          }
          html += '</table>';
          document.getElementById('table').innerHTML = html;
});



angular.module('mean.articles').controller('AccordionCtrl', function ($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
});


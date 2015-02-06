'use strict';

angular.module('mean.articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles',
  function($scope, $stateParams, $location, Global, Articles) {
    $scope.global = Global;

    $scope.hasAuthorization = function(article) {
      if (!article || !article.user) return false;
      return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var article = new Articles({
          title: this.title,
          content: this.content
        });
        article.$save(function(response) {
          $location.path('articles/' + response._id);
        });

        this.title = '';
        this.content = '';
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


angular.module('mean.articles').filter('timestampToDate', function() {
  return function(timestamp) {
    var date = new Date(timestamp * 1000);
    var dateObject = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    return dateObject;
  };
});

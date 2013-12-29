'use strict'

angular.module <%= _.camelize(appname) %>App' <[ ngRoute mainCtrl ]>
  .config ($routeProvider) ->
    $routeProvider.when '/', {
      templateUrl: 'views/main.html'
      controller: 'MainCtrl'
    }
    .otherwise {
      redirectTo: '/'
    }


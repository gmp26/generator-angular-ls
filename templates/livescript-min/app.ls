'use strict'

angular.module '<%= _.camelize(appname) %>App' <[ ngRoute mainController ]>
  .config <[$routeProvider]> ++ ($routeProvider) ->
    $routeProvider.when '/', {
      templateUrl: 'views/main.html'
      controller: 'MainController'
    }
    .otherwise {
      redirectTo: '/'
    }

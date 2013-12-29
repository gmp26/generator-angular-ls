'use strict'

angular.module '<%= _.camelize(name) %>Controller' []
  .controller '<%= _.classify(name) %>Controller', <[$scope]> ++ ($scope) ->
    $scope.awesomeThings =
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
      '[Bootstrap-less or sass]'
      '[jQuery]'
      '[Font-Awesome]'
      '[Live or CoffeeScript]'

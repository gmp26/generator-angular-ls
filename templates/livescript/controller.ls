'use strict'

angular.module '<%= _.camelize(name) %>Ctrl' []
  .controller '<%= _.classify(name) %>Ctrl', <[$scope]> ++ ($scope) ->
    $scope.awesomeThings =
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
      '[Bootstrap-less or sass]'
      '[jQuery]'
      '[Font-Awesome]'
      '[Live or CoffeeScript]'

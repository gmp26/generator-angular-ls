'use strict'

angular.module '<%= _.camelize(appname) %>App'
  .controller '<%= _.classify(name) %>Ctrl', ($scope) ->
    $scope.awesomeThings =
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
      '[Bootstrap-less or sass]'
      '[jQuery]'
      '[Font-Awesome]'
      '[Live or CoffeeScript]'

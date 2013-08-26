'use strict'

angular.module '<%= _.camelize(appname) %>App'
  .controller '<%= _.classify(name) %>Ctrl', ['$scope', ($scope) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
<% if(options.bootstrap) { %>
      'Bootstrap'
<%   if(options.lessBootstrap) { %>
       'Less'
<%   } %>
<%   if(options.compassBootstrap) { %>
       'Sass'
<%   } %>
<% } %>
<% if(options.fontAwesome) { %>
      'Font-awesome glyphs'
<% } %>
      'AngularJS'
      'Karma'
    ]
  ]
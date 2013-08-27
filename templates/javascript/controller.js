'use strict';

angular.module('<%= _.camelize(appname) %>App')
  .controller('<%= _.classify(name) %>Ctrl', function ($scope) {

    $scope.awesomeThings = [
<% _.each(options.installed, function(name, i) {%>
      '(i==0 ? '' : ', ') + <%= name %>'
<%})%> 
    ]

  });
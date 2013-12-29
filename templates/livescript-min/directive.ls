'use strict';

angular.module '<%= _.camelize(name) %>Directive' []
  .directive '<%= _.camelize(name) %>', <[]> ++ ->
    template: '<div></div>'
    restrict: 'E'
    link: (scope, element, attrs) ->
      element.text 'this is the <%= _.camelize(name) %> directive'

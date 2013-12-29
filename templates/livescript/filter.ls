'use strict';

angular.module '<%= _.camelize(name) %>' 
  .filter '<%= _.camelize(name) %>', ->
    (input) ->
      '<%= _.camelize(name) %> filter: ' + input

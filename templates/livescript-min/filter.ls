'use strict';

angular.module '<%= _.camelize(name) %>Filter' []
  .filter '<%= _.camelize(name) %>', <[]> ++ ->
    (input) ->
      '<%= _.camelize(name) %> filter: ' + input

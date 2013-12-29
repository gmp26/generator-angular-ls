'use strict';

angular.module "<%= _.camelize(name) %>"
  .config ($provide) ->
    $provide.decorator "<%= _.camelize(name) %>", ($delegate) ->
      # decorate the $delegate
      $delegate

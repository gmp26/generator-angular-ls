'use strict';

angular.module '<%= _.camelize(name) %>Decorator' []
  .config <[$provide]> ++ ($provide) ->
    $provide.decorator "<%= _.camelize(name) %>", ($delegate) ->
      # decorate the $delegate
      $delegate

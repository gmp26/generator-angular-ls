'use strict';

angular.module '<%= _.camelize(name) %>Factory' []
  .factory '<%= _.camelize(name) %>', <[]> ++ ->
    # Service logic
    # ...

    meaningOfLife = 42

    # Public API here
    {
      someMethod: ->
        meaningOfLife;
    }

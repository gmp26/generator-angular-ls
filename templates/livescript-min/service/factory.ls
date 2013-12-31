'use strict';

angular.module '<%= _.camelize(name) %>' []
  .factory '<%= _.camelize(name) %>', <[]> ++ ->
    # Service logic
    # ...

    meaningOfLife = 42

    # Public API here
    {
      someMethod: ->
        meaningOfLife;
    }

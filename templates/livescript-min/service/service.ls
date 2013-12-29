'use strict';

angular.module('<%= _.camelize(name) %>Service') []
  .service '<%= _.classify(name) %>', ->
    # AngularJS will instantiate a singleton by calling "new" on this function

'use strict'

describe 'Controller: <%= _.classify(name) %>Controller', (_) ->

  # load the controller's module
  beforeEach module '<%= _.camelize(name) %>Controller'

  <%= _.classify(name) %>Controller = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope := $rootScope.$new()
    <%= _.classify(name) %>Controller := $controller '<%= _.classify(name) %>Controller', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect scope.awesomeThings.length .toBe 7

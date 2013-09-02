'use strict'

describe 'Directive: <%= _.camelize(name) %>', (_) ->

  # load the directive's module
  beforeEach module '<%= _.camelize(appname) %>App'

  var $rootScope
  var $scope
  var $compile

  beforeEach inject (_$compile, _$rootScope) ->
    $rootScope := _$rootScope
    $scope := _$rootScope.$new!
    $compile := _$compile

  it 'should make hidden element visible', ->
    element = angular.element '<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>'
    element = $compile(element) $scope
    expect element.text! .toBe 'this is the <%= _.camelize(name) %> directive'

'use strict'

describe 'Directive: <%= _.camelize(name) %>', (_) ->

  # load the directive's module
  beforeEach module '<%= _.camelize(name) %>Directive'

  var $rootScope
  var $scope
  var $compile

  beforeEach inject (_$compile_, _$rootScope_) ->
    $rootScope := _$rootScope_
    $scope := $rootScope.$new!
    $compile := _$compile_

  it 'should make hidden element visible', ->
    element = angular.element '<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>'
    element = $compile(element) $scope
    expect element.text! .toBe 'this is the <%= _.camelize(name) %> directive'

Maintainer: [Mike Pearson](https://github.com/gmp26)

Based on [angular-generator](https://github.com/yeoman/angular-generator/)

This generator produces a base Angular project in [LiveScript](http://Livescript.net).

* Bootstrap with Less/Recess as an alternative to Sass/Compass. This is useful if you 
  want to use angular-ui/bootstrap,
* Font-awesome instead of glyphicons.

It is tested most extensively with these
options enabled.


## Provisional Usage

NB: Until things stabilise further I won't publish this as a node module, so to use you will
have to git clone the repo, cd to it, and run `npm link`.
The generator will then be available globally so skip the install step.

Install `generator-angular-ls`:
```
npm install -g generator-angular-ls
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo angular-ls`, optionally passing an app name. 
```
yo angular-ls [app-name]
```

## Generators

Available generators:

* [angular-ls](#app) (aka [angular-ls:app](#app))
* [angular-ls:controller](#controller)
* [angular-ls:directive](#directive)
* [angular-ls:filter](#filter)
* [angular-ls:route](#route)
* [angular-ls:service](#service)
* [angular-ls:decorator] (#decorator) - tests fail on this. If you know why, please send a pull request.
* [angular-ls:view](#view)

**Note: Generators are to be run from the root directory of your app.**

### App
Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator also optionally installs Twitter Bootstrap and additional AngularJS modules, such as angular-resource.

Example:
```bash
yo angular-ls
```

### Route
Generates a controller and view, and configures a route in `app/scripts/app.js` connecting them.

Example:
```bash
yo angular-ls:route myroute
```

Produces `app/scripts/controllers/myroute.js`:
```livescript
angular.module 'myrouteController' []
  .controller 'MyrouteController', <[$scope]> ++ ($scope) ->
    ...
});
```

Produces `app/views/myroute.html`:
```html
<p>This is the myroute view</p>
```

### Controller
Generates a controller in `app/scripts/controllers`.

Example:
```bash
yo angular-ls:controller user
```

Produces `app/scripts/controllers/user.js`
```livescript
angular.module 'userController' []
  .controller 'UserController', <[$scope]> ++ ($scope) ->
    ...
```
### Directive
Generates a directive in `app/scripts/directives`.

Example:
```bash
yo angular-ls:directive foo
```

Produces `app/scripts/directives/foo.js`:
```livescript
angular.module 'fooDirective' []
  .directive 'foo', <[]> ++ ->
    template: '<div></div>'
    restrict: 'E'
    link: (scope, element, attrs) ->
      element.text 'this is the foo directive'
```

### Filter
Generates a filter in `app/scripts/filters`.

Example:
```bash
yo angular-ls:filter foo
```

Produces `app/scripts/filters/myFilter.js`. 
```livescript
angular.module 'fooFilter' []
  .filter 'foo', <[]> ++ ->
    (input) ->
      'foo filter: ' + input
```

### View
Generates an HTML view file in `app/views`.

Example:
```bash
yo angular-ls:view user
```

Produces `app/views/user.html`:
```html
<p>This is the user view</p>
```

### Service
Generates an AngularJS service.

Example:
```bash
yo angular-ls:service myService
```

Produces `app/scripts/services/myService.js`:
```livescript
angular.module('fooService') []
  .service 'Foo', <[]> ++ ->
    # AngularJS will instantiate a singleton by calling "new" on this function


```

You can also do `yo angular:factory`, `yo angular:provider`, `yo angular:value`, and `yo angular:constant` for other types of services.

### Decorator

THIS IS NOT WORKING YET - tests fail. If you know why, please send a pull request.

Generates an AngularJS service decorator.

Example:
```bash
yo angular-ls:decorator fooService
```

Produces `app/scripts/decorators/serviceNameDecorator.js`:
```livescript
angular.module 'fooServiceDecorator' []
  .config <[$provide]> ++ ($provide) ->
    $provide.decorator "fooService", ($delegate) ->
      # decorate the $delegate
      $delegate
```

## Options
In general, these options can be applied to any generator, though they only affect generators that produce scripts.


### Minification Safe
`generator-angular-ls` always produces minification-safe code. It does this by prefixing the `<[]> ++` to any function `->` that may inject modules. Edit this code to reflect the modules you need. e.g.

```livescript
angular.module 'fooFilter' []
  .filter <[$window $log]> ++ ($window, $log) ->
    # filter which depends on $window and $log
```

## Bower Components

The following packages are always installed by the [app](#app) generator:

* angular
* angular-mocks
* angular-scenario


The following additional modules are available as components on bower, and installable via `bower install`:

* angular-cookies
* angular-loader
* angular-resource
* angular-sanitize

All of these can be updated with `bower update` as new versions of AngularJS are released.

## Configuration
Yeoman generated projects can be further tweaked according to your needs by modifying project files appropriately.

### Output
You can change the `app` directory by adding a `appPath` property to `bower.json`. For instance, if you wanted to easily integrate with Express.js, you could add the following:

```json
{
  "name": "yo-test",
  "version": "0.0.0",
  ...
  "appPath": "public"
}

```
This will cause Yeoman-generated client-side files to be placed in `public`.

## Testing

For tests to work properly, karma needs the `angular-mocks` bower package.
This script is included in the bower.json in the `devDependencies` section, which will
be available very soon, probably with the next minor release of bower.

While bower `devDependencies` are not yet implemented, you can fix it by running:
```bash
bower install angular-mocks
```

By running `grunt test` you should now be able to run your unit tests with karma.

Note that karma will not run any tests until a file has been touched.

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a PR, make sure that the commit messages match the [AngularJS conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)

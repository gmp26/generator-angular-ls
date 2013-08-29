'use strict';
var path = require('path');
var util = require('util');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.indexFile = this.engine(this.read('../../templates/common/index.html'),
      this);

  args = ['main'];

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

  this.appPath = this.env.options.appPath;

  if (typeof this.env.options.coffee === 'undefined') {
    this.option('coffee');

    // attempt to detect if user is using CS or not
    // if cml arg provided, use that; else look for the existence of cs
    if (!this.options.coffee &&
      this.expandFiles(path.join(this.appPath, '/scripts/**/*.coffee'), {}).length > 0) {
      this.options.coffee = true;
    }

    this.env.options.coffee = this.options.coffee;
  }

  if (typeof this.env.options.ls === 'undefined') {
    this.option('ls');

    // attempt to detect if user is using CS or not
    // if cml arg provided, use that; else look for the existence of cs
    if (!this.options.ls &&
      this.expandFiles(path.join(this.appPath, '/scripts/**/*.ls'), {}).length > 0) {
      this.options.ls = true;
    }

    this.env.options.ls = this.options.ls;
  }

  if (typeof this.env.options.minsafe === 'undefined') {
    this.option('minsafe');
    this.env.options.minsafe = this.options.minsafe;
    args.push('--minsafe');
  }

  this.hookFor('angular-ls:common', {
    args: args
  });

  this.hookFor('angular-ls:main', {
    args: args
  });

  this.hookFor('angular-ls:controller', {
    args: args,
  });

  if(this.options.ls) {
    this.template('../../templates/common/_karma.conf.js', 'karma.conf.js');
    this.template('../../templates/common/_karma-e2e.conf.js', 'karma-e2e.conf.js');
  }
  else this.hookFor('karma', {
    as: 'app',
    options: {
      options: {
        coffee: this.options.coffee,
        travis: true,
        'skip-install': this.options['skip-install']
       }
    }
  });

  this.on('end', function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askForBootstrap = function askForBootstrap() {
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'bootstrap',
    message: 'Would you like to include Twitter Bootstrap?',
    default: true
  }, {
    type: 'confirm',
    name: 'lessBootstrap',
    message: 'Would you like to use the less version of Twitter Bootstrap?',
    default: true,
    when: function (props) {
      return props.bootstrap;
    }
  }, {
    type: 'confirm',
    name: 'responsive',
    message: 'Would you like to use the Bootstrap responsive CSS?',
    default: true,
    when: function (props) {
      return props.lessBootstrap;
    }
  }, {
    type: 'confirm',
    name: 'compassBootstrap',
    message: 'Would you like to use the SCSS version of Twitter Bootstrap with the Compass CSS Authoring Framework?',
    default: true,
    when: function (props) {
      return props.bootstrap && !props.lessBootstrap;
    }
  }, {
    type: 'confirm',
    name: 'fontAwesome',
    message: 'Would you like to use fontAwesome glyphs in Bootstrap?',
    default: true,
    when: function (props) {
      return props.lessBootstrap;
    }
  }], function (props) {
    this.options.bootstrap = this.bootstrap = props.bootstrap;
    this.options.compassBootstrap = this.compassBootstrap = props.compassBootstrap;
    this.options.lessBootstrap = this.lessBootstrap = props.lessBootstrap;
    this.options.responsive = this.responsive = props.responsive;
    this.options.fontAwesome = this.fontAwesome = this.lessBootstrap ? props.fontAwesome : false;
    cb();
  }.bind(this));
};


Generator.prototype.askForModules = function askForModules() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'modules',
    message: 'Which modules would you like to include?',
    choices: [{
      value: 'resourceModule',
      name: 'angular-resource.js',
      checked: true
    }, {
      value: 'cookiesModule',
      name: 'angular-cookies.js',
      checked: true
    }, {
      value: 'sanitizeModule',
      name: 'angular-sanitize.js',
      checked: true
    }]
  }];

  this.prompt(prompts, function (props) {
    var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
    this.resourceModule = hasMod('resourceModule');
    this.cookiesModule = hasMod('cookiesModule');
    this.sanitizeModule = hasMod('sanitizeModule');

    cb();
  }.bind(this));
};

// Waiting a more flexible solution for #138
Generator.prototype.bootstrapFiles = function bootstrapFiles() {
  var sass = this.compassBootstrap;
  var less = this.lessBootstrap;
  var files = [];
  var source = 'styles/';
  if (sass)
    source += 'scss/';
  else if (less)
    source += 'less/';
  else
    source += 'css/';
  console.log("Ho THERE sass="+sass+ " less="+less);

  var mainCss = 'main.' + (sass ? 'scss' : 'less');
  var images = sass? 'images' : 'img';   
  if (sass || less) {
    files.push(mainCss);
    this.copy('images/glyphicons-halflings.png', 'app/'+images+'/glyphicons-halflings.png');
    this.copy('images/glyphicons-halflings-white.png', 'app/'+images+'/glyphicons-halflings-white.png');
  }
  else {
    if (this.bootstrap) {
      files.push('bootstrap.css');
    }
    files.push('main.css');
  }

  files.forEach(function (file) {
    this.copy(source + file, 'app/styles/' + file);
  }.bind(this));

  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'css',
    optimizedPath: 'styles/main.css',
    sourceFileList: files.map(function (file) {
        return 'styles/' + file.replace(/(\.scss)|(\.less)/, '.css');
    }),
    searchPath: '.tmp'
  });
};

Generator.prototype.bootstrapJS = function bootstrapJS() {
  if (!this.bootstrap) {
    return;  // Skip if disabled.
  }

  // Wire Twitter Bootstrap plugins
  var pfix = 'bower_components/bootstrap';
  if( this.lessBootstrap ) {
    pfix += '/js/bootstrap-';
  }    
  else {
    pfix += '-sass/js/bootstrap-';    
  }
  this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
    pfix + 'affix.js',
    pfix + 'alert.js',
    pfix + 'dropdown.js',
    pfix + 'tooltip.js',
    pfix + 'modal.js',
    pfix + 'transition.js',
    pfix + 'button.js',
    pfix + 'popover.js',
    pfix + 'typeahead.js',
    pfix + 'carousel.js',
    pfix + 'scrollspy.js',
    pfix + 'collapse.js',
    pfix + 'tab.js'
  ]);
};

Generator.prototype.extraModules = function extraModules() {
  var modules = [];
  if (this.resourceModule) {
    modules.push('bower_components/angular-resource/angular-resource.js');
  }

  if (this.cookiesModule) {
    modules.push('bower_components/angular-cookies/angular-cookies.js');
  }

  if (this.sanitizeModule) {
    modules.push('bower_components/angular-sanitize/angular-sanitize.js');
  }

  if (modules.length) {
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/modules.js',
        modules);
  }
};

Generator.prototype.appJs = function appJs() {
  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    optimizedPath: 'scripts/scripts.js',
    sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js'],
    searchPath: ['.tmp', 'app']
  });
};

Generator.prototype.createIndexHtml = function createIndexHtml() {
  this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.packageFiles = function () {
  this.template('../../templates/common/_bower.json', 'bower.json');
  this.template('../../templates/common/_package.json', 'package.json');
  this.template('../../templates/common/Gruntfile.coffee', 'Gruntfile.coffee');
};

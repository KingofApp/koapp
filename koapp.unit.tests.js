(function() {
  'use strict';
  var koapp   = require('./index');
  var expect  = require("chai").expect;
  // var proxyquire = require('proxyquire').noPreserveCache();

  // fixPluginName       : fixPluginName,
  // camelize            : camelize,
  // fixPluginCategories : fixPluginCategories,
  // copy                : copy,
  // getUniqueItems      : getUniqueItems,
  // debugLog            : debugLog

  var pluginNameMock = "      module Test   ";
  var pluginNameFixedMock = "module-test";
  var pluginNameFixedWithDotsMock = "module.test";
  var selfMock = {
    fs: {
      
    },
    templatePath: function(){

    },
    destinationPath: function(destination){

    },
  };

  describe('[Unit] koapp', function() {
    describe('.fixPluginName', function () {
      describe('on success', function() {
        it('should replace blank spaces by "-"', function() {
          var fixedName = koapp.fixPluginName(pluginNameMock, '-');
          expect(fixedName).to.be.a('string');
          expect(fixedName).to.be.equal(pluginNameFixedMock);
        });

        it('should replace blank spaces by "."', function() {
          var fixedName = koapp.fixPluginName(pluginNameMock, '.');
          expect(fixedName).to.be.a('string');
          expect(fixedName).to.be.equal(pluginNameFixedWithDotsMock);
        });
      });
    });

    describe('.camelize', function() {
      describe('on success', function() {
        it('should transform strings separated by spaces into a camelcase string', function() {
          var str = koapp.camelize('Soy un string');
          expect(str).to.be.equal('soyUnString');
        });
      });
    });

    describe('.fixPluginCategory', function() {
      describe('on success', function() {
        var categories;
        var arrayCategories;

        before(function() {
          categories = koapp.fixPluginCategories('hola, chao, como estas,  bien   ');
          arrayCategories = JSON.parse(categories);
        });

        it('should return a string', function() {
          expect(categories).to.be.a('string');
        });

        it('should have an array like structure', function() {
          expect(categories).to.have.string('["hola","chao","comoestas","bien"]');
        });

        it('should remove blank spaces from keywords', function() {
          expect(arrayCategories[2]).to.be.equal('comoestas');
        });

        it('should trim blank spaces from keywords', function() {
          expect(arrayCategories[3]).to.be.equal('bien');
        });
      });
    });

    describe('.copy', function() {
      describe('on success', function() {
        it('should copy file', function(done) {
          done();
        });
      });
    });

    describe('.getUniqueItems', function() {
      describe('on success', function() {
        var dependencies = {
          "dependencies": {
              "console.mute": "^0.3.0",
              "lodash": "^4.17.4"
            }
        };
        var uniqueItem;

        before(function() {
          uniqueItem = koapp.getUniqueItems(dependencies, 'lodash');
        });

        it('should return an array', function() {
          expect(uniqueItem).to.be.a('array');
        });

        it('should return the key\'s value', function() {
          expect(uniqueItem[0]).to.be.equal('^4.17.4');
        });
      });
    });

    describe('debugLog', function() {
      describe('on success', function() {
        it('', function() {
        });
      });
    });
  });
})();

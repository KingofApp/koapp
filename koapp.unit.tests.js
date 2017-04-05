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
  var pluginNameFixedWithDotsMock = "module.test"

  describe('[Unit] koapp', function() {
    describe('.fixPluginName', function () {
      describe('on success', function() {
        before(function() {
          this.options = {};
        });

        it('replace blank spaces by "-"', function(done) {
          var fixedName = koapp.fixPluginName(pluginNameMock, '-');
          expect(fixedName).to.be.a('string');
          expect(fixedName).to.be.equal(pluginNameFixedMock);
          done();
        });

        it('replace blank spaces by "."', function(done) {
          var fixedName = koapp.fixPluginName(pluginNameMock, '.');
          expect(fixedName).to.be.a('string');
          expect(fixedName).to.be.equal(pluginNameFixedWithDotsMock);
          done();
        });
      });
    });
  });
})();

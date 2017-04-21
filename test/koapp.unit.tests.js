(function() {
  'use strict';
  var koapp   = require('../index');
  var expect  = require("chai").expect;
  var structureMock = require('../mocks/structureMock.json');

  // fixPluginName       : fixPluginName,
  // camelize            : camelize,
  // fixPluginCategories : fixPluginCategories,
  // copy                : copy,
  // getUniqueItems      : getUniqueItems,
  // debugLog            : debugLog
  var pluginNameMock = "      module Test   ";
  var pluginNameFixedMock = "module-test";
  var pluginNameFixedWithDotsMock = "module.test";
  var pluginNameFixedWithSpacesMock = "moduletest";

  describe('[Unit] koapp', function() {
    describe('.fixPluginName', function () {
      describe('on success', function() {

        it('should replace blank spaces by "-"', function(done) {
          var fixedName = koapp.fixPluginName(pluginNameMock, '-');

          expect(fixedName).to.be.a('string');
          expect(fixedName).to.be.equal(pluginNameFixedMock);
          done();
        });

        it('should replace blank spaces by "."', function(done) {
          var fixedName = koapp.fixPluginName(pluginNameMock, '.');

          expect(fixedName).to.be.a('string');
          expect(fixedName).to.be.equal(pluginNameFixedWithDotsMock);
          done();
        });

        it('should remove blank spaces', function(done) {
          var fixedName = koapp.fixPluginName(pluginNameMock, '');

          expect(fixedName).to.be.a('string');
          expect(fixedName).to.be.equal(pluginNameFixedWithSpacesMock);
          done();
        });

      });
    });

    describe('.camelize', function() {
      describe('on success', function() {

        it('should transform strings separated by spaces into a camelcase string', function(done) {
          var str = koapp.camelize('Soy un string');
          expect(str).to.be.equal('soyUnString');
          done();
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

        it('should return a string', function(done) {
          expect(categories).to.be.a('string');
          done();
        });

        it('should have an array like structure', function(done) {
          expect(categories).to.have.string('["hola","chao","comoestas","bien"]');
          done();
        });

        it('should remove blank spaces from keywords', function(done) {
          expect(arrayCategories[2]).to.be.equal('comoestas');
          done();
        });

        it('should trim blank spaces from keywords', function(done) {
          expect(arrayCategories[3]).to.be.equal('bien');
          done();
        });

      });
      
    });

    describe('.getUniqueItems', function() {
      describe('on success', function() {

        it('should return an array of libraries', function(done) {
          var uniqueItem = koapp.getUniqueItems(structureMock.modules, 'libs');
          expect(uniqueItem).to.be.a('array');
          expect(uniqueItem.length).to.be.equal(6);
          done();
        });

        it('should return the key\'s value', function(done) {
          var uniqueItem = koapp.getUniqueItems(structureMock.modules, 'libs');
          
          uniqueItem.forEach(function(item) {
            expect(item).to.have.property('bower');
            expect(item).to.have.property('src');
          });

          done();
        });

      });

      describe('on failure', function() {

        it('should return an empty array when wrong object is passed', function(done) {
          var uniqueItem = koapp.getUniqueItems(structureMock, 'libs');

          expect(uniqueItem).to.be.a('array');
          expect(uniqueItem.length).to.be.equal(0);

          done();
        });

        it('should return an empty array when wrong key is passed', function(done) {
          var uniqueItem = koapp.getUniqueItems(structureMock.modules, 'hello');

          expect(uniqueItem).to.be.a('array');
          expect(uniqueItem.length).to.be.equal(0);

          done();
        });

      });
    });
  });
})();

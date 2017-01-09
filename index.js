module.exports = {
  parseCategories     : parseCategories,
  fixPluginName       : fixPluginName,
  camelize            : camelize,
  fixPluginCategories : fixPluginCategories
}

/**
* @param {String} user's input
*/
function parseCategories(input) {
  this.options.categories = input.split(',');
}

/** Function that validate the Spinner name
* @returns {String}
*/
function fixPluginName(name, ReplaceSymbol) {
  name = name.toLowerCase().trim();
  return name.replace(/ /g, ReplaceSymbol);
}

/** Function that validate the Categories
* @returns {String}
*/
function fixPluginCategories(list) {
  list = list.replace(/ /g, '').toLowerCase().trim();
  var arrayCategories = list.split(',');
  return JSON.stringify(arrayCategories);
}

/** Function that converts a string into camel case using javascript regex
 * @author Christian C. Salvadó
 * @see http://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
 * @param {string} user's input
 * @returns {string} camelCase
*/
function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

/** Function direct copy files
* @param {object} this
* @param {object} input
* @param {array} relative location - files to copy
* @param {boolean} [false] internally it uses copy or copyTpl
*/
function directCopy(self, input, files, templated) {
  templated = templated || false;

  for (var i = files.length; i--;) {
    if (templated) {
      self.fs.copyTpl(
        self.templatePath(files[i]),
        self.destinationPath(files[i]),
        input
      );
    } else {
      self.fs.copy(
        self.templatePath(files[i]),
        self.destinationPath(files[i]),
        input
      );
    }
  }
}

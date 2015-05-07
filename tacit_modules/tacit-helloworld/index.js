/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */
module.exports = {
  escape: function(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  /**
   * Unescape special characters in the given string of html.
   *
   * @param  {String} html
   * @return {String}
   */
  unescape: function(html) {
    return String(html)
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, ''')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }
};

Note the use of module.exports, which we discussed previously, and is needed to make code available for use by other modules.
Further, as our module is not reliant on any other modules, we did not need to require anything.

Next, we’ll surely want to write some tests. Perhaps it would have been preferable to write them first. Regardless, I prefer to use the Mocha and Chai frameworks, but you can use whatever you like. These can be installed and persisted to the package.json file with the following commands.
Note that they are added to the ‘devDependencies’ section, as they are only required during development and not at runtime.

Type the following whilst still inside the tacit-helloworld directory where the package.json file resides:

npm install mocha --save-dev
npm install chai --save-dev

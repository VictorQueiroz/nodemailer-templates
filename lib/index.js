var Mustache = require('mustache');

/**
 * @module index
 */
module.exports = {
  /**
   * Replaces all Mustache {{val}} placeholder values with values from the model object.
   * @param {object} argMailOptions - Mail object that contains fields such as from:, to:, subject:, html:.
   * @param {object} argModel  - Data to fill in the mail option placeholders.
   */
  MustacheMail: function(argMailOptions, argModel) {
    if (typeof argMailOptions === 'object' && typeof argModel === 'object') {
      var option;
      for (option in argMailOptions) {
        var optionVal = argMailOptions[option];

        // Nodemailer allows for options to be mixed in with standard mail fields so check for string.
        if (typeof optionVal === 'string') {
          argMailOptions[option] = Mustache.render(optionVal, argModel);
        }
      }
    }

    return argMailOptions;
  }
};

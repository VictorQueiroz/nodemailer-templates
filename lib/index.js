var Mustache = require('mustache');

/**
 * @module Index
 */

/**
 * Replaces all Mustache {{val}} placeholder values with values from the model object.
 * @param {object} argMailOptions - Mail object that contains field such as from:, to:, subject:, html:.
 * @param {object} argModel  - Data to fill in the mail option placeholders.
 */

function MustacheMail(argMailOptions, argModel) {
  return typeof argModel === 'object' ? this._render(argMailOptions, argModel) : argMailOptions;
}

/**
 * Replaces all Mustache {{val}} placeholder values with values from the model object.
 * @param {object} argMailOptions - Mail object that contains field such as from:, to:, subject:, html:.
 * @param {object} argModel  - Data to fill in the mail option placeholders.
 */
MustacheMail.prototype._render = function(argMailOptions, argModel) {
  for (var option in argMailOptions) {
    var optionVal = argMailOptions[option];

    // Nodemailer allows for options to be mixed in with standard mail fields so check for string.
    if (typeof optionVal === 'string') {
      argMailOptions[option] = Mustache.render(optionVal, argModel);
    }
  }

  return argMailOptions;
}

module.exports = MustacheMail;

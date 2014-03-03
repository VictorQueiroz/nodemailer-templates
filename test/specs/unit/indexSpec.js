var expect = require('chai').expect;

var MustacheMail = require('../../../lib/index');

describe('MustacheMail', function() {
  var myEmail = "johnrichardpittman@gmail.com";
  var mustacheMail;
  var mailOptions;
  var mailModel = {
    email: myEmail
  }

  beforeEach(function() {
    mailOptions = {
      from: "{{email}}"
    };

    mustacheMail = new MustacheMail(mailOptions, mailModel);
  });

  describe('#_render', function() {
    it('Replace all mustache tags with data from mailModel.', function() {
      expect(mustacheMail.from).to.equal(myEmail);
    });
  });
});

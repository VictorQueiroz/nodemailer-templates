var expect = require('chai').expect;

var MustacheMail = require('../../../lib/index').MustacheMail;

describe('MustacheMail', function() {
  var myEmail = "johnrichardpittman@gmail.com";
  var mailOptions;
  var mailModel = {
    email: myEmail
  }

  beforeEach(function() {
    mailOptions = {
      from: "{{email}}"
    };
  });

  describe('#_render', function() {
    it('Replace all mustache tags with data from mailModel.', function() {
      var mustacheMail = MustacheMail(mailOptions, mailModel);

      expect(mustacheMail.from).to.equal(myEmail);
    });
  });
});

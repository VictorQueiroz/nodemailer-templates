nodemailer-templates
================

Template objects to render templated emails such as {{}} for nodemailer.

Project Installation
====================

Prequisites:
- nodejs
- npm
- Java for JSDoc

Open a terminal in the root of this project.<br/>
Run "npm install".<br/>
Run "gulp".<br/>

Documentation
=============

Please refer to https://github.com/andris9/Nodemailer on how to use nodemailer. 
<br />
Example:
<br />
<br />
var nodemailer = require("nodemailer");
<br />
var MustacheMail = require("nodemailer-templates").MustacheMail;
<br />
<br />
// create reusable transport method (opens pool of SMTP connections)
<br />
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "gmail.user@gmail.com",
        pass: "userpass"
    }
});
<br />
<br />
// setup e-mail data with unicode symbols
<br />
var mailOptions = {
    from: "{{sender}}", // sender address
    to: "{{receiver}}", // list of receivers
    subject: "{{subject}}", // Subject line
    html: "{{body}}" // html body
}
<br />
<br />
// setup the MustacheMail model
<br />
var mailModel = {
    sender: "Fred Foo ✔ <foo@blurdybloop.com>",
    receiver: "bar@blurdybloop.com, baz@blurdybloop.com",
    subject: "Hello ✔",
    body: "<b>Hello world ✔</b>"
};
<br />
<br />
// Create and send Mustache mail with defined transport object
<br />
smtpTransport.sendMail(MustacheMail(mailOptions, mailModel), function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});

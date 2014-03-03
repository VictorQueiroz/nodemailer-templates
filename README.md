nodemailer-mustache
================

Mustache plugin object to render {{}} templated emails for nodemailer.

Project Installation
====================

Prequisites:
- npm
- Java for JSDoc

Open a terminal in the root of this project.
Run "npm install".
Run "gulp".

Documentation
=============

Please refer to https://github.com/andris9/Nodemailer on how to use nodemailer. 

Example:

var nodemailer = require("nodemailer");
var MustacheMail = require("nodemailer-mustache");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "gmail.user@gmail.com",
        pass: "userpass"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "{{sender}}", // sender address
    to: "{{receiver}}", // list of receivers
    subject: "{{subject}}", // Subject line
    html: "{{body}}" // html body
}

// setup the MustacheMail model
var mailModel = {
    sender: "Fred Foo ✔ <foo@blurdybloop.com>",
    receiver: "bar@blurdybloop.com, baz@blurdybloop.com",
    subject: "Hello ✔",
    body: "<b>Hello world ✔</b>"
};

// Create and send Mustache mail with defined transport object
smtpTransport.sendMail(new MustacheMail(mailOptions, mailModel), function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});
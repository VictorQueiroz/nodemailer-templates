package-seed-js
===============

Template for creating a package in JavaScript.

Project Installation
====================

Prequisites:
- nodejs
- Java

Open a terminal in the root of this project.
Run "npm install".
Run "gulp".

Documentation
=============

Create source files under the lib directory and tests under test/specs/.
Setting the client compatibility value to false in the settings.js will use mocha only for testing which will not generate coverage and result files automatically.
By default the compatibility mode is set for the module to be compatibile with both the client and server.
var mysql = require('mysql');
var helpers = require('./helpers.js');
var dbSettings = require('./db-settings.json');
var db;

var methods = {
  connect: function() {
    db = mysql.createConnection({
      host: dbSettings.host,
      user: dbSettings.user,
      password: dbSettings.password,
      database: dbSettings.database
    });

    db.connect(function(err, result) {
      if (err) {
        throw err;
      }
    });
    return db;
  }
}

module.exports = methods;

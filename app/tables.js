// let mysql = require('mysql');
// let db = require('./connection.js');


let moment = require('moment');
let $ = require('jquery');
let { graphql, buildSchema } = require('graphql');
let Schema = require('./schema');
let MongoClient = require('mongodb').MongoClient;
require('bootstrap');

// form config from json to build out form
let formConfig = require('./form-config.json');

// setting up and testing mongo for date_added
let COMPANIES = [];

// Connect to the company db
MongoClient.connect("mongodb://localhost:51714/clientdatafile", function (err, database) {
  let mongoDataBase = database.db('clientdatafile');
  mongoDataBase.collection('company').find({}, function (findErr, result) {
    if (findErr) throw findErr;
    result.toArray().then((data) => {
      COMPANIES = data;
    });
  });
});

$(function(){

  // click for testing mongoDataBase
  document.getElementById("btn-test").addEventListener("click", function() {
    // testing the company schema queries with graphql
    graphql(Schema , 'query { companies { _id, company_name, contact_name, phone, date_added } }').then((response) => {
      console.log(response.data);
      console.log(JSON.stringify( response.data , null, " "));
    });
  });

});

const connection = require('./connection.js');
const jquery = require('jquery');
const helpers = require('./helpers.js');


let $ = jquery;

$(function() {
  $('#connect').click(function(e){
    e.preventDefault();
    let obj = {};
    obj.host = $('#inputHost').val();
    obj.db = $('#inputDatabase').val();
    obj.user = $('#inputUser').val();
    obj.pass = $('#inputPassword').val();
    if (obj.host != '' && obj.db != '' && obj.user != '' && obj.pass != '') {
      connection.connect(obj);
      helpers.openWindow('tables');
    } else {
      alert('Please fill in all fields!')
    }
  });
});

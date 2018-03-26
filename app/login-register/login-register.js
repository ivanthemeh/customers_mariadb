const jquery = require('jquery');
const helpers = require('../helpers.js');

let $ = jquery;

$(function() {
  $('#signin').click(function(){
    let email = $('#inputEmail').val();
    let pass = $('#inputPassword').val();
    if (email == 'admin@admin.com' && pass == 'password') {
      helpers.openWindow('connect');
    } else {
      alert('Invalid Login Info');
    }
  });
});

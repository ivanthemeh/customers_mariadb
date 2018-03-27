var mysql = require('mysql');
var Promise = require('promise');
var db = require('./connection.js');
var moment = require('moment');
var $ = require('jquery');
require('bootstrap');
var updatingForm = '';

let formConfig = require('./form-config.json');

$(function(){
  // setting up initial headers and data for table
  var companyHeaders = 'id,company_name,contact_name,phone,date_added';
  let initialTable = 'Companies';
  $('.tables').append(`
    <table id="${initialTable.toLowerCase()}" class="table table-dark">
      <thead>
        <h3>${initialTable}</h3>
      </thead>
        <tbody>
          <tr></tr>
        </tbody>
    </table>
  `);

  var initialQuery = `SELECT ${companyHeaders} FROM ${initialTable}`;
  var initialTableData = {};
  db.connect().query(initialQuery, function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      initialTableData.results = result;
      initialTableData.fields = fields;
      buildTable(initialTable, fields, result);
    }
  });

  // click handler for save btn
  $('.save-btn').click(function() {
    updateForm(updatingForm);
  });

  // getting form being updated last
  $('input').on('keyup', function(){
    updatingForm = $(this).closest('form')[0].id;
  });

  // buidling forms and tabs from form-config.json
  let tabStr = "";
  let formStr = "";
  let dropDownStr = "";
  let count = 0;
  let countDropdown = 1;
  let isActive = "";

  for (let i in formConfig) {
    let formConfigObjs = formConfig[i];
    if (count === 0) {
      isActive = "active";
    } else {
      isActive = "";
    }
    tabStr += `<li class="nav-item">
    <a class="nav-link ${isActive}" id="${i}-tab" data-toggle="tab" href="#${i}" role="tab" aria-controls="${i}" aria-selected="">${i.replace(/(_-*)/g, ' ').toUpperCase()}</a>
    </li>`;
    count++;
    for (let ii in formConfigObjs) {
      console.log(ii);
      // console.log(formConfigObjs[ii]);
      let formArr = formConfigObjs[ii];
      dropDownStr += `
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${countDropdown}" aria-expanded="false" aria-controls="collapse${countDropdown}">
                ${ii.replace(/(_-*)/g,' ').toUpperCase()}
              </button>
            </h5>
          </div>

          <div id="collapse${countDropdown}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
      `;
      countDropdown++;

      // checking if is object to get fields for forms
      if (isObject(formArr)) {
        for (let iii in formArr) {
          // console.log(ii + "_" + iii);
          // console.log(formArr[iii]);
        }
      } else {
        // console.log(ii);
        // console.log(formConfigObjs[ii]);
      }
    }
  }

  $('#accordion').append(dropDownStr);
  $('#companyTabs').append(tabStr);
  // console.log(tabStr);

});













function addTableHeaders(fields) {
  var str = '';
  fields.forEach(function(e,i){
    str += `<th>${e.name.replace(/(_-*)/g, ' ').toUpperCase()}</th>`;
  });
  return str;
};

function addTableData(data) {
  var str = '';
  data.forEach(function(e,i){
    str += `<tr id='${e["id"]}'>`;
    for (var key in e) {
      if (key == 'date_added') {
        str += `<td>${moment(e[key]).format('ll')}</td>`
      } else {
        str += `<td>${e[key]}</td>`;
      }
    }
  });
  str += '</tr>';
  return str;
};

function buildTable(db, fields, data) {
  var str = {};
  str.head = `<tr>${addTableHeaders(fields)}</tr>`;
  str.body = `${addTableData(data)}`;
  $('#companies thead').append(str.head);
  $('#companies tbody').append(str.body);
  $('.tables tr').click(function(){
    sqlQueryModal(db, this.id);
  });
};

function sqlQueryModal(initialTable, id) {
  var query = `SELECT * FROM ${initialTable} WHERE id='${id}'`;
  db.connect().query(query, function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      var company = result[0];
      for (var key in company) {
        var str = '#' + key;
        if (str == '#date_added') {
          $(str).val(moment(company[key]).format('ll'));
        } else {
          $(str).val(company[key]);
        }
      }
      $('#queryModal').modal('toggle');
    }
  });
};

function updateForm(form) {
  var inputs = $(`#${form} input`);
  var query = `UPDATE \`${form}\` SET `;
  inputs.each(function(){
    query += `\`${this.id}\` = '${this.value}',`;
  });
  query = query.slice(0, -1);
  query += 'WHERE `Companies`.`id` = 1;';
  db.connect().query(query, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('Company Updated!');
    }
  });
  console.log(inputs);
}

function isObject(item) {
  return (typeof item === "object" && !Array.isArray(item) && item !== null);
}





















// <table id="${db.toLowerCase()}" class="table table-dark">
//   <thead>
//     <h3>${db}</h3>
//     <tr>
//       ${addTableHeaders(fields)}
//     </tr>
//   </thead>
//     <tbody>
//       ${addTableData(data)}
//     </tbody>
// </table>
// `;




// var tableData = {
//   tables: [],
// }

// $(function() {
//   // get tables in initialTable
//   var query = 'SHOW TABLES';
//   db.connect().query(query, function (err, result) {
//     if (err) throw err;
//     // getting tables from initialTable
//     tableData.tables = result;
//     tableData.tables.forEach(function(table){
//       var tbl = table.Tables_in_clientdatafile;
//       var queryFields = `SHOW COLUMNS from ${tbl}`;
//       db.connect().query(queryFields, function (err, result) {
//         if (err) throw err;
//         table['fields'] = result;
//       });
//       // getting rows from each table
//       var queryTables = `SELECT * from ${tbl}`;
//       db.connect().query(queryTables, function (err, result) {
//         // json = JSON.stringify(result);
//         // console.log(JSON.parse(json));
//         if (err) throw err;
//         table['data'] = result;
//       });
//     });
//     console.log(tableData);
//   });
//
//   // dynamically adding initial tableData limiting with maxHeaders var
//   function addTableData(tableNum) {
//     var data = tableData.tables[tableNum].data;
//     var str = '';
//     data.forEach(function(item,index) {
//       str += `<tr id='${item["id"]}'>`;
//       var count = 0;
//       for (key in item) {
//         if (count >= maxHeaders) {
//           return false;
//         }
//         // check for date to prettify
//         if (key == 'date_added') {
//           str += `<td>${moment(item[key]).format('ll')}</td>`
//         } else {
//           str += `<td>${item[key]}</td>`
//         }
//         // console.log(key);
//         // console.log(item[key]);
//         count++;
//       }
//       str += '</tr>'
//     });
//     return str;
//   }
//
//   // dynamically adding headers from tableData limiting with maxHeaders var
//   function addTableHeaders(tableNum) {
//     var str = '';
//     tableData.tables[tableNum].fields.forEach(function(field, index) {
//       if (index >= maxHeaders) {
//         return false;
//       }
//       str += `<th scope="col">${field.Field.replace(/(_-*)/g, ' ').toUpperCase()}</th>`;
//     });
//     return str;
//   }
//
//   // building tables
//   function buildTables() {
//     var str = '';
//     tableData.tables.forEach(function(table,index) {
//       var tableName = table.Tables_in_clientdatafile;
//       str += `
//       <table class="table table-dark">
//               <thead>
//                 <h3>${tableName}</h3>
//                 <tr>
//                   ${addTableHeaders(index)}
//                 </tr>
//               </thead>
//                 <tbody>
//                   <tr>
//                   ${addTableData(index)}
//                   </tr>
//                 </tbody>
//             </table>
//       `;
//     });
//     return str;
//   }
//
//   // appending tables to tables container
//   setTimeout(function(){
//       $('.tables').append(`${buildTables()}`);
//       $('.tables table tr').click(function() {
//           console.log(this.id);
//           console.log(tableData.tables);
//       });
//   },250);
// });















// var createTblSql = `IF NOT EXISTS (SELECT * FROM dbo.sysobjects where id = object_id(N'dbo.[my_table_name]') and OBJECTPROPERTY(id, N'IsTable') = 1)
// 	BEGIN
// 		CREATE TABLE dbo.[my_table_name]
// 		(
// 			[ID] [int] IDENTITY(1,1) NOT NULL ,
// 	                [Name] NVARCHAR(200)
// 		)
// 	END
// GO`;

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'electron_db'
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// console.log("connection::", connection);


var sql = "INSERT INTO Users (name, password) VALUES ('adminnie mcadmin', 'password')";
connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("1 record inserted", result);
});

var createTblSql = `IF NOT EXISTS (SELECT * FROM dbo.sysobjects where id = object_id(N'dbo.[my_table_name]') and OBJECTPROPERTY(id, N'IsTable') = 1)
	BEGIN
		CREATE TABLE dbo.[my_table_name]
		(
			[ID] [int] IDENTITY(1,1) NOT NULL ,
	                [Name] NVARCHAR(200)
		)
	END
GO`;

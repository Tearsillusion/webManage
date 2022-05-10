
const mysql = require('mysql')

const useMysql = ()=>{
	let conn = mysql.createConnection({
		host:'101.43.228.243',
		prot:'9004',
		user:'root',
		password:'ljl1234',
		database:'webTeam',
		charset:'utf8',
	})
	conn.connect(function(err){
		console.log(err)
	})
	return conn;
}
module.exports = useMysql


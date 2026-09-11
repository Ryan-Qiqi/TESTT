const Database = require("better-sqlite3")

db = new Database('datos.db')


db.exec(`

CREATE TABLE IF NOT EXISTS registros (

id INTEGER PRIMARY KEY AUTOINCREMENT,
cedula TEXT NOT NULL UNIQUE,
nombre TEXT NOT NULL, 
email TEXT NOT NULL UNIQUE, 
hora_llegada TEXT NOT NULL

)


`)

module.exports = db
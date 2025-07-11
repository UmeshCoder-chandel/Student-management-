import mysql from 'mysql2'

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"StudentManagment"
})

db.connect(err=>{
    if(err)
        throw err;
    else
    console.log("Databases Connected");
})

export default db;
var mysql = require("promise-mysql"),
    configs = require("./configs");
    doQuery = (sql,callback) => {
        con = mysql.createConnection(
            configs.sql()
        )
        .then(cn => {
            var result = cn.query(sql)
            cn.end()
            return result
        })
        .then(rows => {
            callback(rows)
        })
        .error(err => {
            console.log("Error",err)
        })
    }
    doInsert = (sql,callback)=>{
        con = mysql.createConnection(
            configs.sql()
        )
        .then(cn => {
            cn.query(sql,(err,result)=>{
                return result.insertId
            })
            cn.end()
        })
    }
module.exports = {
    doQuery:doQuery,
    doInsert:doInsert
}
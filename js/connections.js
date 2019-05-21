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
module.exports = {
    doQuery:doQuery
}
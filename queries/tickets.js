gets = () => {
    sql = "select * from tickets "
    console.log("SQL ticket gets",sql)
    return sql
}
get = obj => {
    sql = "select * from tickets "
    sql+= "where id = " + obj.id + " "
    console.log("SQL ticket get",sql)
    return sql
}
module.exports = {
    gets:gets,
    get:get
}
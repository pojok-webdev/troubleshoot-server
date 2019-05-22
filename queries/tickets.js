gets = () => {
    sql = "select * from tickets "
    sql+= "order by kdticket desc "
    console.log("SQL ticket gets",sql)
    return sql
}
get = obj => {
    sql = "select * from tickets "
    sql+= "where id = " + obj.id + " "
    sql+= "order by kdticket desc "

    console.log("SQL ticket get",sql)
    return sql
}
module.exports = {
    gets:gets,
    get:get
}
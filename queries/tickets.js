gets = () => {
    sql = "select * from tickets "
    return sql
}
get = obj => {
    sql = "select * from tickets "
    sql+= "where id = " + obj.id + " "
    return sql
}
module.exports = {
    gets:gets,
    get:get
}
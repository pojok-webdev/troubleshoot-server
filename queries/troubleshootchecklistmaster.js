gets = () => {
    sql = "select id,category,name,'' planning,'' hasil,'' target from troubleshootchecklistitems "
    sql+= "order by id asc "
    return sql
}
module.exports = {
    gets:gets
}
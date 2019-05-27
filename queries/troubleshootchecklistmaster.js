gets = () => {
    sql = "select id,category,name from troubleshootchecklistitems "
    sql+= "order by id asc "
    return sql
}
module.exports = {
    gets:gets
}
gets = () => {
    sql = "select id,category,name from troubleshootchecklists "
    sql = "order by id asc "
    return sql
}
module.exports = {
    gets:gets
}
gets = () => {
    sql = "select a.id,b.clientname name,b.kdticket from troubleshoot_requests a "
    sql+= "left outer join tickets b on b.id=a.ticket_id "
    return sql
}
get = obj => {
    sql = "select a.id,b.clientname name,b.kdticket from troubleshoot_requests a "
    sql+= "left outer join tickets b on b.id=a.ticket_id "
    sql+= "where a.id = " + obj.id +" "
    return sql
}
module.exports = {
    gets:gets,get:get
}
gets = () => {
    sql = "select a.id,b.clientname name,b.kdticket,count(c.id)checklistcount from troubleshoot_requests a "
    sql+= "left outer join tickets b on b.id=a.ticket_id "
    sql+= "left outer join troubleshootchecklists c on c.troubleshoot_id=a.id "
    sql+= "group by a.id,b.clientname,b.kdticket "
    sql+= "order by b.kdticket desc "
    console.log("SQL troubleshoot gets",sql)
    return sql
}
get = obj => {
    sql = "select a.id,b.clientname name,b.kdticket,count(c.id)checklistcount from troubleshoot_requests a "
    sql+= "left outer join tickets b on b.id=a.ticket_id "
    sql+= "left outer join troubleshootchecklists c on c.troubleshoot_id=a.id "
    sql+= "where a.id = " + obj.id +" "
    sql+= "group by a.id,b.clientname,b.kdticket "
    sql+= "order by b.kdticket desc "
    console.log("SQL troubleshoot get",sql)
    return sql
}
getslimit = obj => {
    sql = "select a.id,b.clientname name,b.kdticket,count(c.id)checklistcount from troubleshoot_requests a "
    sql+= "left outer join tickets b on b.id=a.ticket_id "
    sql+= "left outer join troubleshootchecklists c on c.troubleshoot_id=a.id "
    sql+= "group by a.id,b.clientname,b.kdticket "
    sql+= "order by b.kdticket desc "
    sql+= "limit " + obj.segment + ", " + obj.offset + " "
    console.log("SQL troubleshoot getslimit",sql)
    return sql
}
search = obj => {
    sql = "select a.id,b.clientname name,b.kdticket,count(c.id)checklistcount from troubleshoot_requests a "
    sql+= "left outer join tickets b on b.id=a.ticket_id "
    sql+= "left outer join troubleshootchecklists c on c.troubleshoot_id=a.id "
    sql+= "where b.clientname like '%" + obj.clientname + "%' or b.kdticket like '%" + obj.kdticket + "%' "
    sql+= "group by a.id,b.clientname,b.kdticket "
    sql+= "order by b.kdticket desc "
    sql+= "limit " + obj.segment + ", " + obj.offset + " "
    console.log("SQL troubleshoot search",sql)
    return sql
}
module.exports = {
    gets:gets,get:get,getslimit:getslimit,search:search
}
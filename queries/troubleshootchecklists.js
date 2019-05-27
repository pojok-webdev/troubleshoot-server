amountByTroubleshoot = obj => {
    sql = "select count(troubleshootchecklist_id) cnt from troubleshootchecklists_troubleshootchecklistitems "
    sql+= "where troubleshootchecklist_id = " + obj.id + " "
    return sql; 
}
createCheckList = obj => {
    sql = "insert into troubleshootchecklists_troubleshootchecklistitems "
    sql+= "(troubleshootchecklist_id,t1,h1,t2,h2,note,createuser ) "
    sql+= "values "
    sql+= "("+obj.troubleshootchecklist_id+",'"+obj.t1+"','"+obj.h1+"','"+obj.t2+"','"+obj.h2+"','"+obj.note+"','"+obj.createuser+"')"
    return sql
}
getByTroubleshoot = () => {
    sql = "select * from troubleshootchecklists_troubleshootchecklistitems "
    sql+= "where troubleshootchecklist_id = " + obj.id + " "
    return sql; 
}
module.exports = {
    amountByTroubleshoot:amountByTroubleshoot
}
getByTroubleshoot = obj => {
    sql = "select * from troubleshootchecklists "
    sql+= "where troubleshoot_id = " + obj.troubleshoot_id + " "
    return sql; 
}
module.exports = {
    getByTroubleshoot:getByTroubleshoot
}
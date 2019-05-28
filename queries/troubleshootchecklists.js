getByTroubleshoot = obj => {
    sql = "select * from troubleshootchecklists "
    sql+= "where troubleshoot_id = " + obj.troubleshoot_id + " "
    return sql; 
}
saveChecklist = obj => {
    sql = "insert into troubleshootchecklists "
    sql+= "("
    sql+= "troubleshoot_id,"
    sql+= "deviceused,"
    sql+= "devicebrought,"
    sql+= "problemcategory,"
    sql+= "problemtype,"
    sql+= "troubleshootdate,"
    sql+= "createuser"
    sql+= ") "
    sql+= "values "
    sql+= "("
    sql+= ""+obj.troubleshoot_id+","
    sql+= "'"+obj.deviceused+"',"
    sql+= "'"+obj.devicebrought+"',"
    sql+= "'"+obj.problemcategory+"',"
    sql+= "'"+obj.problemtype+"',"
    sql+= "'"+obj.troubleshootdate+"',"
    sql+= "'"+obj.createuser+"'"
    sql+= ")"
    console.log("save checklist",sql)
    return sql
}
module.exports = {
    getByTroubleshoot:getByTroubleshoot,
    saveChecklist:saveChecklist
}
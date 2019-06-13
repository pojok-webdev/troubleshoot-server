getByTroubleshoot = obj => {
    sql = "select * from troubleshootchecklists "
    sql+= "where troubleshoot_id = " + obj.troubleshoot_id + " "
    sql = "select a.id,c.kdticket,e.name,a.problemtype from troubleshootchecklists a "
    sql+= "left outer join troubleshoot_requests b on b.id=a.troubleshoot_id "
    sql+= "left outer join tickets c on c.id=b.ticket_id "
    sql+= "left outer join client_sites d on d.id=b.client_site_id "
    sql+= "left outer join clients e on e.id=d.client_id "
    sql+= "where a.troubleshoot_id = " + obj.troubleshoot_id + " "
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
updateChecklist = obj => {
    sql = "update troubleshootchecklists "
    sql+= "set deviceused='"+obj.deviceused+"', "
    sql+= "devicebrought='"+obj.devicebrought+"', "
    sql+= "problemcategory='"+obj.problemcategory+"', "
    sql+= "problemtype='"+obj.problemtype+"', "
    sql+= "troubleshootdate='"+obj.troubleshootdate+"' "
    sql+= "where id="+obj.id+" "
    console.log("update checklist",sql)
    return sql
}
saveImplementers = obj => {
    sql = "insert into troubleshootchecklists_implementers "
    sql+= "(troubleshootchecklist_id,implementer_id) "
    sql+= "values "
    sql+= "("+obj.troubleshootchecklist_id+","+obj.implementer_id+")"
    console.log("saveImplementer",obj,sql)
    return sql
}
saveBroughtDevices = obj => {
    sql = "insert into troubleshootchecklists_broughtdevices "
    sql+= "(troubleshootchecklist_id,device_id) "
    sql+= "values "
    sql+= "("+obj.troubleshootchecklist_id+","+obj.device_id+")"
    console.log("saveBroughtDevice",obj,sql)
    return sql
}
saveUsedDevices = obj => {
    sql = "insert into troubleshootchecklists_useddevices "
    sql+= "(troubleshootchecklist_id,device_id) "
    sql+= "values "
    sql+= "("+obj.troubleshootchecklist_id+","+obj.device_id+")"
    console.log("saveBroughtDevice",obj,sql)
    return sql
}
saveProblemcauses = obj => {
    sql = "insert into troubleshootchecklists_problems "
    sql+= "(troubleshootchecklist_id,problem_id) "
    sql+= "values "
    sql+= "("+obj.troubleshootchecklist_id+","+obj.problem_id+")"
    console.log("saveBroughtDevice",obj,sql)
    return sql
}
getObj = obj => {
    sql = "select * from troubleshootchecklists "
    sql+= "where id = " + obj.troubleshootchecklist_id
    return sql
}
getItems = obj => {
    sql = "select * from " + obj.table + " "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " "
    console.log("getItems",sql)
    return sql
}
module.exports = {
    getByTroubleshoot:getByTroubleshoot,
    saveChecklist:saveChecklist,
    updateChecklist:updateChecklist,
    saveImplementers:saveImplementers,
    saveBroughtDevices:saveBroughtDevices,
    saveUsedDevices:saveUsedDevices,
    saveProblemcauses:saveProblemcauses,
    getObj:getObj,
    getItems:getItems
}
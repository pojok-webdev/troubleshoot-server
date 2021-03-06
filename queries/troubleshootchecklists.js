getByTroubleshoot = obj => {
    sql = "select a.id,c.kdticket,e.name,a.createuser,a.createdate from troubleshootchecklists a "
    sql+= "left outer join troubleshoot_requests b on b.id=a.troubleshoot_id "
    sql+= "left outer join tickets c on c.id=b.ticket_id "
    sql+= "left outer join client_sites d on d.id=b.client_site_id "
    sql+= "left outer join clients e on e.id=d.client_id "
    sql+= "where a.troubleshoot_id = " + obj.troubleshoot_id + " "
    console.log("getByTroubleshoot",sql)
    return sql; 
}
saveChecklist = obj => {
    sql = "insert into troubleshootchecklists "
    sql+= "("
    sql+= "troubleshoot_id,"
    sql+= "troubleshootdate,"
    sql+= "createuser"
    sql+= ") "
    sql+= "values "
    sql+= "("
    sql+= ""+obj.troubleshoot_id+","
    sql+= "'"+obj.troubleshootdate+"',"
    sql+= "'"+obj.createuser+"'"
    sql+= ")"
    console.log("save checklist",sql)
    return sql
}
updateChecklist = obj => {
    sql = "update troubleshootchecklists "
    sql+= "set "
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
    console.log("saveUsedDevice",obj,sql)
    return sql
}
saveProblemcauses = obj => {
    sql = "insert into troubleshootchecklists_problems "
    sql+= "(troubleshootchecklist_id,problem_id) "
    sql+= "values "
    sql+= "("+obj.troubleshootchecklist_id+","+obj.problem_id+")"
    console.log("saveProblemcauses",obj,sql)
    return sql
}
getObj = obj => {
    sql = "select * from troubleshootchecklists "
    sql+= "where id = " + obj.troubleshootchecklist_id
    return sql
}
getImplementers = obj => {
    sql = "select a.implementer_id id, a.troubleshootchecklist_id,a.implementer_id,b.username from troubleshootchecklists_implementers a "
    sql+= "left outer join users b on b.id=a.implementer_id "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " "
    console.log("getImplementers",sql)
    return sql
}
removeImplementer = obj => {
    console.log("ImPlemeNter OBJ",obj)
    sql = "delete from troubleshootchecklists_implementers "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " and implementer_id = " + obj.implementer_id + " "
    console.log("remove implementer",sql)
    return sql
}
removeImplementerByTroubleshootchecklist = obj => {
    console.log("ImPlemeNter OBJ",obj)
    sql = "delete from troubleshootchecklists_implementers "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " "
    console.log("remove implementer",sql)
    return sql
}
getDevicebroughts = obj => {
    sql = "select a.troubleshootchecklist_id,a.device_id,b.name from troubleshootchecklists_broughtdevices a "
    sql+= "left outer join devices b on b.id=a.device_id "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " "
    console.log("getDevicebrought",sql)
    return sql
}
removeDevicebrought = obj => {
    sql = "delete from troubleshootchecklists_broughtdevices "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " and device_id = " + obj.device_id + " "
    console.log("remove device brought",sql)
    return sql
}
removeDevicebroughtByTroubleshootchecklist = obj => {
    sql = "delete from troubleshootchecklists_broughtdevices "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " "
    console.log("remove device brought",sql)
    return sql
}
getDeviceused = obj => {
    sql = "select a.troubleshootchecklist_id,a.device_id,b.name from troubleshootchecklists_useddevices a "
    sql+= "left outer join devices b on b.id=a.device_id "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " "
    console.log("getDeviceused",sql)
    return sql
}
removeDeviceused = obj => {
    sql = "delete from troubleshootchecklists_useddevices "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " and device_id = " + obj.device_id + " "
    console.log("remove device used",sql)
    return sql
}
removeDeviceusedByTroubleshootchecklist = obj => {
    sql = "delete from troubleshootchecklists_useddevices "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " "
    console.log("remove device used",sql)
    return sql
}
getProblems = obj => {
    sql = "select a.problem_id id,a.troubleshootchecklist_id,a.problem_id,b.name from troubleshootchecklists_problems a "
    sql+= "left outer join ticketcauses b on b.id=a.problem_id "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " "
    console.log("getProblems",sql)
    return sql
}
removeProblem = obj => {
    sql = "delete from troubleshootchecklists_problems "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " and problem_id = " + obj.problem_id + " "
    console.log("remove problem",sql)
    return sql
}
removeProblemByTroubleshootchecklist = obj => {
    sql = "delete from troubleshootchecklists_problems "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " "
    console.log("remove problem",sql)
    return sql
}
saveItem = obj => {
    sql = "insert into troubleshootchecklists_troubleshootchecklistitems "
    sql+= "(troubleshootchecklist_id,category,name,planning,result,target,description) "
    sql+= "values "
    sql+= "("+obj.troubleshootchecklist_id+",'"+obj.category+"','"+obj.name+"','"+obj.planning+"','"+obj.result+"','"+obj.target+"','"+obj.description+"') "
    sql+= ""
    console.log("SQL SAVEITEM",sql)
    return sql
}
getItems = obj => {
    sql = "select a.id,a.troubleshootchecklist_id,a.category,a.name,a.planning,a.result,a.target,a.description "
    sql+= "from troubleshootchecklists_troubleshootchecklistitems a "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " "
    console.log("getItems",sql)
    return sql
}
removeItemByTroubleshootchecklist = obj => {
    sql = "delete "
    sql+= "from troubleshootchecklists_troubleshootchecklistitems "
    sql+= "where troubleshootchecklist_id = " + obj.troubleshootchecklist_id + " "
    console.log("removeItem",sql)
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
    getImplementers:getImplementers,
    getDevicebroughts:getDevicebroughts,
    getDeviceused:getDeviceused,
    getProblems:getProblems,
    removeDevicebrought:removeDevicebrought,
    removeDeviceused:removeDeviceused,
    removeImplementer:removeImplementer,
    removeProblem:removeProblem,
    saveItem:saveItem,
    getItems:getItems,
    removeItemByTroubleshootchecklist:removeItemByTroubleshootchecklist,
    removeDevicebroughtByTroubleshootchecklist:removeDevicebroughtByTroubleshootchecklist,
    removeDeviceusedByTroubleshootchecklist:removeDeviceusedByTroubleshootchecklist,
    removeImplementerByTroubleshootchecklist:removeImplementerByTroubleshootchecklist,
    removeProblemByTroubleshootchecklist:removeProblemByTroubleshootchecklist
}
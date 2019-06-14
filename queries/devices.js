gets = ()=>{
    sql = "select id device_id,id,devicetype_id,name,satuan,active,description,user_name,create_date from devices "
    return sql
}
module.exports = {
    gets:gets 
}

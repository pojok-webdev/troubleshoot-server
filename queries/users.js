gets = obj => {
    sql = "select distinct a.id,a.email,username,jobdesc,a.group_id,c.name from users a "
    sql+= "left outer join groups_users b on b.user_id=a.id "
    sql+= "left outer join groups c on c.id=b.group_id "
    sql+= "left outer join roles_users d on d.user_id=a.id "
    sql+= "left outer join roles e on e.id=d.role_id "
    sql+= "where c.id = " + obj.group_id + " and a.active='1' and a.status='1' "
    sql+= "and e.name in ('field','ts')"
    console.log("SQL",sql)
    return sql
}
module.exports = {
    gets:gets
}
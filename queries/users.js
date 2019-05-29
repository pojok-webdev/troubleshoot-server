gets = obj => {
    sql = "select a.id,a.email,username,jobdesc,a.group_id,c.name from users a "
    sql+= "left outer join groups_users b on b.user_id=a.id "
    sql+= "left outer join groups c on c.id=b.group_id "
    sql+= "where c.id = " + obj.group_id + " "
    return 
}
module.exports = {
    gets:gets
}
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    connection = require("./js/connections"),
    tickets = require("./queries/tickets"),
    troubleshoots = require("./queries/troubleshoots"),
    troubleshootchecklists = require("./queries/troubleshootchecklists"),
    devices = require("./queries/devices"),
    users = require("./queries/users"),
    ticketproblems = require("./queries/ticketproblems"),
    troubleshootchecklistmaster = require("./queries/troubleshootchecklistmaster");
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")
    next()
})
app.use(bodyParser.json({limit:'10mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}))
app.get('/troubleshootchecklistimplementers/:troubleshootchecklist_id',(req,res)=>{
    connection.doQuery(troubleshootchecklists.getImplementers(req.params),rows => {
        res.send(rows)
    })
})
app.get('/troubleshootchecklistdevicebroughts/:troubleshootchecklist_id',(req,res)=>{
    connection.doQuery(troubleshootchecklists.getDevicebroughts(req.params),rows => {
        res.send(rows)
    })
})
app.get('/troubleshootchecklistdeviceuseds/:troubleshootchecklist_id',(req,res)=>{
    connection.doQuery(troubleshootchecklists.getDeviceused(req.params),rows => {
        res.send(rows)
    })
})
app.get('/troubleshootchecklistproblems/:troubleshootchecklist_id',(req,res)=>{
    connection.doQuery(troubleshootchecklists.getProblems(req.params),rows => {
        res.send(rows)
    })
})

app.get('/troubleshootchecklistremoveproblem/:troubleshootchecklist_id/:problem_id',(req,res)=>{
    connection.doQuery(troubleshootchecklists.removeProblem(req.params),rows => {
        res.send(rows)
    })
})
app.get('/troubleshootchecklistremovedeviceused/:troubleshootchecklist_id/:device_id',(req,res)=>{
    connection.doQuery(troubleshootchecklists.removeDeviceused(req.params),rows => {
        res.send(rows)
    })
})
app.get('/troubleshootchecklistremovedevicebrought/:troubleshootchecklist_id/:device_id',(req,res)=>{
    connection.doQuery(troubleshootchecklists.removeDevicebrought(req.params),rows => {
        res.send(rows)
    })
})
app.get('/troubleshootchecklistremoveimplementer/:troubleshootchecklist_id/:implementer_id',(req,res)=>{
    connection.doQuery(troubleshootchecklists.removeImplementer(req.params),rows => {
        res.send(rows)
    })
})




app.get('/tickets',(req,res)=>{
    connection.doQuery(tickets.gets(req.body),rows => {
        res.send(rows)
    })
})
app.get('/ticket/:id',(req,res)=>{
    connection.doQuery(tickets.get(req.params),rows => {
        res.send(rows)
    })
})
app.get('/troubleshoots',(req,res)=>{
    connection.doQuery(troubleshoots.gets(req.body),rows => {
        res.send(rows)
    })
})
app.get('/troubleshoot/:id',(req,res)=>{
    console.log("REQ.PARAMS",req.params)
    connection.doQuery(troubleshoots.get(req.params),rows => {
        res.send(rows)
    })
})
app.get('/troubleshootslimit/:segment/:offset',(req,res)=>{
    connection.doQuery(troubleshoots.getslimit(req.params),rows => {
        res.send(rows)
    })
})
app.post('/troubleshootsearch',(req,res)=>{
    console.log("ReqBody",req.body)
    connection.doQuery(troubleshoots.search(req.body),rows => {
        res.send(rows)
    })
})
app.get('/troubleshootchecklistmaster',(req,res)=>{
    connection.doQuery(troubleshootchecklistmaster.gets(req.params),rows => {
        res.send(rows)
    })
})
app.get('/troubleshootchecklistsgetbytroubleshoot/:troubleshoot_id',(req,res)=>{
    connection.doQuery(troubleshootchecklists.getByTroubleshoot(req.params),rows => {
        res.send(rows)
    })
})
saveChecklistDetails = (srcParams,checklistId) => {
    if(srcParams.problemType==="edit"){
        srcParams.users.forEach(user => {
            connection.doQuery(troubleshootchecklists.removeImplementer(
                {
                    troubleshootchecklist_id:checklistId,
                    implementer_id:user.implementer_id
                }
            ),res => {})
        })
        srcParams.devicesBrought.forEach(dev => {
            connection.doQuery(troubleshootchecklists.removeDevicebrought(
                {
                    troubleshootchecklist_id:checklistId,
                    device_id:dev.device_id
                }
            ),res => {})
        })
        srcParams.devicesUsed.forEach(dev => {
            connection.doQuery(troubleshootchecklists.removeDeviceused(
                {
                    troubleshootchecklist_id:checklistId,
                    device_id:dev.device_id
                }
            ),res => {})
        })
        srcParams.problemTypes.forEach(problem => {
            connection.doQuery(troubleshootchecklists.removeProblem(
                {
                    troubleshootchecklist_id:checklistId,
                    problem_id:problem.problem_id
                }
            ),res => {})
        })
    }
    srcParams.users.forEach(user => {
        console.log("USER",user)
        connection.doQuery(troubleshootchecklists.saveImplementers(
            {
                troubleshootchecklist_id:checklistId,
                implementer_id:user.id
            }),res => {
            return(res)
        })
    })
    srcParams.devicesBrought.forEach(dev=>{
        connection.doQuery(troubleshootchecklists.saveBroughtDevices(
            {
                troubleshootchecklist_id:checklistId,
                device_id:dev.device_id
            }),res => {
            return(res)
        })    
    })
    srcParams.devicesUsed.forEach(dev => {
        connection.doQuery(troubleshootchecklists.saveUsedDevices(
            {
                troubleshootchecklist_id:checklistId,
                device_id:dev.device_id
            }),res => {
            return(res)
        })
    })
    srcParams.problemTypes.forEach(problem => {
        connection.doQuery(troubleshootchecklists.saveProblemcauses(
            {
                troubleshootchecklist_id:checklistId,
                problem_id:problem.id
            }),res => {
            return(res)
        })
    })
    srcParams.items.forEach(item => {
        connection.doQuery(troubleshootchecklists.saveItem(
            {
                troubleshootchecklist_id:checklistId,
                name:item.name,
                category:item.category,
                target:item.target,
                result:item.result,
                planning:item.planning
            }),res => {
            return(res)
        })
    })
}
app.post('/troubleshootchecklistsave',(req,res) => {
    let srcParams = req.body
    console.log(req.body)
    switch(srcParams.problemType){
        case 'add':
        console.log('add woy')
            connection.doQuery(troubleshootchecklists.saveChecklist(srcParams),rows => {
                saveChecklistDetails(srcParams,rows.insertId)
            })
        break
        case 'edit':
        console.log('edit woy')
            connection.doQuery(troubleshootchecklists.updateChecklist(srcParams),rows => {
                saveChecklistDetails(srcParams,srcParams.id)
            })
        break
    }
})
app.get('/devicegets',(req,res)=>{
    connection.doQuery(devices.gets(),rows => {
        res.send(rows)
    })
})
app.get('/usergets/:group_id',(req,res)=>{
    connection.doQuery(users.gets(req.params),rows => {
        res.send(rows)
    })
})
app.get('/ticketproblems',(req,res)=>{
    connection.doQuery(ticketproblems.gets(),rows => {
        res.send(rows)
    })
})
app.get('/troubleshootchecklistsgetbyid/:troubleshootchecklist_id',(req,res)=>{
    connection.doQuery(troubleshootchecklists.getObj(req.params),rows =>{
        res.send(rows)
    })
})
app.listen(process.env.PORT||2319)
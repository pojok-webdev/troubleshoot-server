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
    console.log("Output",rows)
    srcParams.users.forEach(user => {
        connection.doQuery(troubleshootchecklists.saveImplementers(
            {
                troubleshootchecklist_id:checklistId,
                implementer_id:user.id
            }),res => {
            return(res)
        })
    })
    srcParams.devicesBrought.forEach(dev=>{
        console.log("Device brought",dev)
        connection.doQuery(troubleshootchecklists.saveBroughtDevices(
            {
                troubleshootchecklist_id:checklistId,
                device_id:dev.id
            }),res => {
            return(res)
        })    
    })
    srcParams.devicesUsed.forEach(dev => {
        connection.doQuery(troubleshootchecklists.saveUsedDevices(
            {
                troubleshootchecklist_id:checklistId,
                device_id:dev.id
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
}
app.post('/troubleshootchecklistsave',(req,res) => {
    let srcParams = req.body
    switch(srcParams.requestType){
        case 'add':
            connection.doQuery(troubleshootchecklists.saveChecklist(srcParams),rows => {
                this.saveChecklistDetails(srcParams,rows.insertId)
            })
        break
        case 'edit':
            connection.doQuery(troubleshootchecklists.updateChecklist(srcParams),rows => {
                this.saveChecklistDetails(srcParams,srcParams.id)
            })
        break
    }
    connection.doQuery(troubleshootchecklists.saveChecklist(req.body),rows => {
        res.send(rows)
    })
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
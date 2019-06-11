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
app.post('/troubleshootchecklistsave',(req,res) => {
    console.log("post params",req.body)
    let srcParams = req.body
    connection.doQuery(troubleshootchecklists.saveChecklist(req.body),rows => {
        console.log("Output",rows)
        srcParams.users.forEach(user => {
            connection.doQuery(troubleshootchecklists.saveImplementers({troubleshootchecklist_id:rows.insertId,implementer_id:user.id}),res => {
                return(res)
            })
        })
        srcParams.devicesBrought.forEach(dev=>{
            console.log("Device brought",dev)
            connection.doQuery(troubleshootchecklists.saveBroughtDevices({troubleshootchecklist_id:rows.insertId,device_id:dev.id}),res => {
                return(res)
            })    
        })
        srcParams.devicesUsed.forEach(dev => {
            connection.doQuery(troubleshootchecklists.saveUsedDevices({troubleshootchecklist_id:rows.insertId,device_id:dev.id}),res => {
                return(res)
            })
        })
        srcParams.problemTypes.forEach(problem => {
            connection.doQuery(troubleshootchecklists.saveProblemcauses({troubleshootchecklist_id:rows.insertId,problem_id:problem.id}),res => {
                return(res)
            })
        })
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
app.listen(process.env.PORT||2319)
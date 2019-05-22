var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    connection = require("./js/connections"),
    tickets = require("./queries/tickets"),
    troubleshoots = require("./queries/troubleshoots");
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Alow-Headers","Origin,X-Requested-With,Content-Type,Accept")
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
    console.log("ReqBody",req.body)
    connection.doQuery(troubleshoots.get(req.params),rows => {
        res.send(rows)
    })
})
app.get('/troubleshootslimit/:segment/:offset',(req,res)=>{
    console.log("ReqBody",req.body)
    connection.doQuery(troubleshoots.getslimit(req.params),rows => {
        res.send(rows)
    })
})

app.listen(process.env.PORT||2319)
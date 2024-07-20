const express = require('express');
const app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:false}))
app.get('/about',(req,res)=>{
  res.send('<h1>about us </h1>')
})
app.get('/form',(req,res)=>{
  res.send('<html>form action="/message" methods="post"><label>"username"></br>')
})
app.post('/message',(req,res)=>{
  console.log(req.body);
})
app.get('/',(req,res)=>{
  res.send('<h1>Home page</h1>')
})
app.listen(5000),()=>{
  console.log('server listening in port 5000');
};
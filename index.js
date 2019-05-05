const fs = require('fs');
const http = require('http');
const url = require('url');
const md5 = require('md5-node');
const eventEimmiter = require('events')

class MyEmitter extends eventEimmiter {};
const myEmitter = new MyEmitter();
const app = http.createServer(async (req, res) =>{
    let a = '';
    
    console.log(req.url);
    console.log(url.parse(req.url).pathname);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*')
    await req.on('data',(data)=>{
        a = data.toString();
        console.log(a)
    })
    res.end(a)
    
    
    
})

app.listen(3333,'127.0.0.1');
console.info(`this server is running in 127.0.0.1:3333`)
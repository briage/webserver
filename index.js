const fs = require('fs');
const http = require('http');
const url = require('url');
const md5 = require('md5-node');
const eventEimmiter = require('events')

class MyEmitter extends eventEimmiter {};
const myEmitter = new MyEmitter();
const app = http.createServer(async (req, res) =>{
    
    
    
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    console.log(req.method)
    if(req.method.toLowerCase() === 'get'){
        if(req.url != '/'){
            let data = url.parse(req.url,true).query;
            if(data['a'] === "1"){
                res.end('天下第一');
            }else if(data[a] === "2"){
                res.end('天下第二');
            }
        }
        
        
    }else if(req.method.toLowerCase() === 'post'){
        let a = '';
        await req.on('data',data=>{
            a = data.toString();
            console.log(a)
        })
        res.end(a)
    }
    if(req.method.toLowerCase() === 'options'){
        res.statusCode = 200;
        res.end();
    }
    
    
    
})

app.listen(3333,'127.0.0.1');
console.info(`this server is running in 127.0.0.1:3333`)
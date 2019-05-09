const fs = require('fs');
const http = require('http');
const url = require('url');
const md5 = require('md5-node');
const eventEimmiter = require('events')
const promisify = require('util').promisify;
const MongoClient = require('mongodb').MongoClient;

class MyEmitter extends eventEimmiter {};
const myEmitter = new MyEmitter();

const dbUrl = 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb/';
const rs = promisify(fs.readFile);
const app = http.createServer(async (req, res) =>{
    
    
    
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    console.log(req.method)
    console.log(req.url)
    console.log(req.method.toLowerCase())
    let theUrl = url.parse(req.url,true);
    console.log(theUrl.pathname)
    if(req.method.toLowerCase() === 'get'){
        if(theUrl.pathname === '/'){
            let data = theUrl.query;
            MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err,db) => {
                if(err){
                    console.log('数据库连接失败')
                    console.log(err);
                    
                }
                    console.log('连接成功')
                    db.db('bysj').collection('user').find({}).toArray((error,result)=>{
                        let len = result.length;
                        console.log(len)
                        if(error){
                            console.log(error)
                        }
                        for(let i = 0; i < len; i ++){
                            console.log(result[i])
                            if(result[i].userid === data.userid && result[i].password === data.password){
                                let token = Math.floor(Math.random()*1000)
                                console.log('校验成功') 
                                res.statusCode = 200;
                                result[i].token = token;
                                console.log(JSON.stringify(result[i]))
                                res.end(JSON.stringify(result[i]))
                                db.close();
                                break;
                            }
                        }
                        
                            res.statusCode = 404;
                            console.log('meizhaodao')
                            res.end('没有该用户');
                            
                        
                        })
                    
                
            })

            // let a = '';
            // if(data.id === '1' && data.b === '2'){
                
                
            // }   
        }else if(theUrl.query.id && theUrl.pathname === '/gettoken'){
                console.log('获取token')
                res.statusCode = 200;
                res.end(Math.floor(Math.random() * 1000).toString());
        }else if(theUrl.pathname === '/getteacher'){
            console.log('获取教师')
            MongoClient.connect(dbUrl, {useNewUrlParser : true}, (err, db) => {
                if(err) {
                    console.log(err)
                }
                db.db('bysj').collection('user').find({}).limit(5).toArray((error, result) => {
                    if(error){
                        console.log(error);
                    }
                    res.statusCode = 200;
                    res.end(JSON.stringify(result))
                })
            })
        }  
    }else if(req.method.toLowerCase() === 'post'){
        let a = '';
        await req.on('data',data=>{
            a = data.toString();
            console.info(a)
        })
        res.end(a)
    }
    if(req.method.toLowerCase() === 'options'){
        res.statusCode = 200;
        res.end();
    }
    
    
    
})

app.listen(5555,'127.0.0.1');
console.info(`this server is running in 127.0.0.1:5555`)
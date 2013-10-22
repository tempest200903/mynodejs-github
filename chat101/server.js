// chat101/server.js
var fs=require('fs');

var port = process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || 8080;  
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP;
console.log("port =: " + port);
console.log("process.cwd() =: " + process.cwd());

var app=require('http').createServer(server).listen(port, ipaddr);
function server(req,res){
    console.log("process.cwd() =: " + process.cwd());
    var project_dir = "chat101";
    if(req.url==='/'){
        var file_realpath = process.cwd() + '/' + project_dir + '/view.html';
        console.log("file_realpath =: " + file_realpath);
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(fs.readFileSync(file_realpath));
    }
    if(req.url==='/client.js'){
        res.writeHead(200,{"Content-Type":"text/javascript"});
        res.write(fs.readFileSync(project_dir + '/client.js'));
    }
    res.end();
}
var io=require('socket.io').listen(app);
console.log("require('socket.io').listen(app); => success!");
var manager=io.on('connection',main);
function main(client){
    var chat;
    client.emit('join');
    client.on('join_then',function(label){
        chat=label;
        client.join(label);
        client.send('welcome to '+label);
    });
    client.on('message',function(text){
        manager.sockets.to(chat).send(text);
    });
}
io.set('log level',2);

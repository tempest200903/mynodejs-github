// client.js

window.addEventListener('load',main);
function main(){
  var form=document.getElementsByTagName("form")[0];
  var input=document.getElementsByTagName("input")[0];
  var pre=document.getElementsByTagName("pre")[0];

  var server=io.connect();
  server.on('join',function(){
    var label=prompt("join to...");
    server.emit('join_then',label);
  });
  form.addEventListener('submit',function(event){
    server.send(input.value);
    event.preventDefault();
  });
  server.on('message',function(value){
    var text=document.createTextNode(value+"\n");
    pre.appendChild(text);
  });
}

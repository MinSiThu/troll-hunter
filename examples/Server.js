let Server = require("../thServer");
let path = require("path");

Server.appDirectory(path.join(__dirname,"public"));
Server.LISTEN(3000,()=>{
    console.log('Server is active');
});
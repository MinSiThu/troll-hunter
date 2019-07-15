let express = require("express");
let app = express();

module.exports = {
    app,
    LISTEN(port,cb){
        if(cb != undefined){
            app.listen(port,cb);
        }
    },
    appDirectory(path){
        app.use(express.static(path));
    }
};
let {
    app,
    BrowserWindow,
    TouchBarSlider,
    session
} = require("electron");
let fs = require("fs");

class MyWindows{
    static show(){
        let u = new MyWindows();
    }
    constructor(){
        let {screen} = require("electron");
        let size = screen.getPrimaryDisplay().workAreaSize
        this.window = new BrowserWindow({
            width:size.width * 0.3,
            height:size.height * 0.5,
            webPreferences:{
                nodeIntegration:true,
                defaultEncoding:"utf8"
            },
            show:false
        });
        this.window.loadFile("./build/index.html");
        MyWindows.window = this.window;
        MyWindows.window.show();

    }
    /**@type {BrowserWindow} */
    static window;
}



app.on("ready", controlMain);

async function controlMain()
{
    await new Promise(ok => {
        fs.access("./profile","r",(er)=>{
            if(er)
            {
                fs.mkdir("./profile", err =>{
                    if(!err) ok()
                })
            }else ok()
        })
    });
    app.setPath("userData",__dirname+"/profile");
    MyWindows.show();
}
require("./bin/db.js")
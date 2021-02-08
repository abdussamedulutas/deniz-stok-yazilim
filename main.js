let {
    app,
    BrowserWindow,
    TouchBarSlider,
    session
} = require("electron");
let fs = require("fs");
global.debug = false;
class MyWindows{
    static show(p){
        return new MyWindows(p);
    }
    static modal(p){
        MyWindows.show(p)
    }
    constructor({page,parentWin,isModal,w,h}){
        let {screen} = require("electron");
        let size = screen.getPrimaryDisplay().workAreaSize
        this.window = new BrowserWindow({
            width:size.width * w,
            height:size.height * h,
            webPreferences:{
                nodeIntegration:true,
                defaultEncoding:"utf8"
            },
            parent:parentWin,
            modal:isModal?true:false,
            show:false
        });
        this.window.loadFile("./build/index.html");
        if(!debug){
            this.window.removeMenu()
        }
        this.window.webContents.on("dom-ready",() => {
            this.window.webContents.send("show-page",page);
            this.window.show()
        });
    }
}
class ModalWindow{
    static async show(o){
        return await new Promise(ok => {
            let replied = false;
            let mywin = MyWindows.show(o);
            mywin.window.webContents.on("ipc-message",function(event,channel,pack){
                if(channel == "reply"){
                    replied = true;
                    mywin.window.close();
                    ok(pack);
                }
            })
            mywin.window.on("close",function(){
                !replied && ok(undefined)
            })
        })
    }
}



app.on("ready", controlMain);

let main = null;

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
    if(await ModalWindow.show({page:"login",w:0.3,h:0.5}))
    {
         main = MyWindows.show({page:"main",w:0.8,h:0.8});
    }else app.exit(0)
}
require("./bin/db.js")

let {
    app,
    BrowserWindow,
    TouchBarSlider,
    session,
    ipcMain
} = require("electron");
let fs = require("fs");
global.debug = true;
class MyWindows{
    static show(p){
        return new MyWindows(p);
    }
    static modal(p){
        MyWindows.show(p)
    }
    constructor({page,parentWin,isModal,w,h,args}){
        let {screen} = require("electron");
        let size = screen.getPrimaryDisplay().size
        let width = size.width * w;
        let height = size.height * h;
        this.window = new BrowserWindow({
            width:width,
            height:height,
            webPreferences:{
                nodeIntegration:true,
                defaultEncoding:"utf8",
                contextIsolation:false
            },
            parent:parentWin,
            modal:isModal?true:false,
            show:false
        });
        this.window.loadURL("http://localhost:3000")
        //this.window.loadFile("./build/index.html");
        if(!debug){
            this.window.removeMenu()
        }
        this.window.webContents.on("dom-ready",() => {
            this.window.webContents.send("show-page",page,args);
            this.window.show()
            this.window.setSize(width,height,true)
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

ipcMain.handle("modal",async function(event,page,...args){
    let parentWin = BrowserWindow.fromWebContents(event.sender);
    return await ModalWindow.show({
        parentWin:parentWin,
        isModal:true,
        page:page,
        w:0.3,
        h:0.5,
        args:args
    })
})

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
    //if(await ModalWindow.show({page:"login",w:0.3,h:0.5}))
    //{
        main = MyWindows.show({page:"main",w:0.8,h:0.9});
    //}else app.exit(0)
}
require("./bin/db.js")

import LoginScreen from "./Login.js";
import MainScreen from "./Main.js";
import { render } from "react-dom";
import { useState } from "react";
let {ipcRenderer} = window.require("electron");


function App()
{
    let [screen,setScreen] = useState(false);
    ipcRenderer.on("show-page",function(event,page){
        setScreen(page);
    })
    return <Realitive
        screen={screen}
    />;
}

function Realitive(props)
{
    switch(props.screen)
    {
        case "login":{
            return <LoginScreen/>;
        }
        case "main":{
            return <MainScreen/>;
        }
        default:{
            return <></>;
        }
    }
}

render(
    <App />,
    document.querySelector("#root")
);
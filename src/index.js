import LoginScreen from "./Login.js";
import MainScreen from "./Main.js";
import { render } from "react-dom";
import { useState } from "react";
import {trTR} from "@material-ui/core/locale";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
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
};
const theme = createMuiTheme({},trTR);
render(
    <ThemeProvider theme={theme}>
     <App />
    </ThemeProvider>,
    document.querySelector("#root")
);
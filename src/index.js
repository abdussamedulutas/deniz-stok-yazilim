import LoginScreen from "./Login";
import MainScreen from "./Main";

import AddProductScreen from "./products/AddProduct";
import EditProductScreen from "./products/EditProduct";
import AddClientScreen from "./client/AddClient";
import EditClientScreen from "./client/EditClient";

import { render } from "react-dom";
import { useEffect, useState } from "react";
import {trTR} from "@material-ui/core/locale";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
let {ipcRenderer} = window.require("electron");


function App()
{
    let [screen,setScreen] = useState(false);
    let [params,setParam] = useState(false);
    useEffect(function(){
        ipcRenderer.on("show-page",function(event,page, ...params){
            setScreen(page);
            setParam(params)
        });
    },[])
    return <Realitive screen={screen} {...params} />;
}

function Realitive(props)
{
    switch(props.screen)
    {
        case "login":       return <LoginScreen {...props} />;
        case "main":        return <MainScreen {...props} />;
        case "addproduct":  return <AddProductScreen {...props} />;
        case "editproduct": return <EditProductScreen {...props} />;
        case "addclient":   return <AddClientScreen {...props} />;
        case "editclient":  return <EditClientScreen {...props} />
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
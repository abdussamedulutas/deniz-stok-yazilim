import LoginScreen from "./Login";
import MainScreen from "./Main";
import AddProductScreen from "./products/AddProduct.js";
import UpdateProductScreen from "./products/UpdateProduct";


import { render } from "react-dom";
import { useState } from "react";
import {trTR} from "@material-ui/core/locale";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
let {ipcRenderer} = window.require("electron");


function App()
{
    let [screen,setScreen] = useState(false);
    ipcRenderer.on("show-page",function(event,page,args){
        setScreen({
            page,
            args
        });
    })
    return <>
        {screen ?
            <Realitive screen={screen.page} args={screen.args} />
        : null}
    </>;
}

function Realitive(props)
{
    switch(props.screen)
    {
        case "login":{
            return <LoginScreen args={props.args}/>;
        }
        case "main":{
            return <MainScreen args={props.args}/>;
        }
        case "addproduct":{
            return <AddProductScreen args={props.args}/>;
        }
        case "updateproduct":{
            return <UpdateProductScreen args={props.args}/>;
        }
        default:return <></>;
    }
};
const theme = createMuiTheme({},trTR);
render(
    <ThemeProvider theme={theme}>
     <App />
    </ThemeProvider>,
    document.querySelector("#root")
);
import { useState } from "react";
import {Box, Button, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import "./styles/Login.css";
let {ipcRenderer} = window.require("electron");

export default function LoginScreen(props)
{
    let [errorMessage,setErrorMessage] = useState(false);
    let [successMessage,setSuccessMessage] = useState(false);
    let [name,setName] = useState("");
    let [password,setPassword] = useState("");

    document.title = "Kullanıcı Girişi";
    let styles = {
        marginTop:"auto",
        marginBottom:"auto"
    };

    async function login()
    {
        setErrorMessage(false);
        setSuccessMessage(false);
        let ccc = await ipcRenderer.invoke("auth","login",name,password);
        if(ccc){
            localStorage["userid"] = ccc;
            setSuccessMessage("Giriş Başarılı !");
            setTimeout(function(){
                ipcRenderer.send("reply",{name,password});
            },1000)
        }else{
            setErrorMessage("Kullanıcı adı veya şifresi hatalı !");
        }
    }
    return <>
        <Box height="100%" display="flex">
            <Box width="300px" height="400px" margin="auto" display="flex" flexDirection="column">
                <Box style={styles} fontSize="h4.fontSize" marginBottom="10px" textAlign="center">
                    Kullanıcı Hesabı
                </Box>
                <Box style={styles}>
                    <TextField label="Adınız" marginBottom="10px" fullWidth onChange={e => setName(e.target.value)} ariant="outlined"/>
                </Box>
                <Box style={styles}>
                    <TextField label="Şifreniz" marginBottom="10px" fullWidth onChange={e => setPassword(e.target.value)} ariant="outlined"/>
                </Box>
               <Box style={styles} textAlign="center">
                    <Button variant="outlined" color="primary" style={{marginTop:"auto"}} onClick={() => login(name,password)}>
                        Kaydet
                    </Button>
               </Box>
               <Box style={styles} textAlign="center">
                   {errorMessage ? <Alert severity="warning">{errorMessage}</Alert> : null}
                   {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}
               </Box>
            </Box>
        </Box>
    </>
}
import { useState } from "react";
import {Backdrop, Box, Button, CircularProgress, TextField} from "@material-ui/core";
let {ipcRenderer} = window.require("electron");
/*
    isim
    soyisim
    telefon
    email
    address
    balance
    age
    descript
    createdate
    updatedate
    deletedate
*/
export default function AddClientScreen()
{
    let
        [isim,setisim] = useState(""),
        [soyisim,setsoyisim] = useState(""),
        [telefon,settelefon] = useState(""),
        [email,setemail] = useState(""),
        [address,setaddress] = useState(0),
        [balance,setbalance] = useState(0),
        [age,setage] = useState(""),
        [descript,setdescript] = useState(""),
        [showSpin,setShowSpin] = useState(false);
    document.title = "Yeni Müşteri Ekleme";
    function saveClient()
    {
        setShowSpin(true);
        let client = {
            isim:isim,
            soyisim:soyisim,
            telefon:telefon,
            email:email,
            address:address,
            balance:balance,
            age:age,
            descript:descript
        };
        ipcRenderer.invoke("db-insert-client",client).then(function(){
            setShowSpin(false);
            setTimeout(function(){
                ipcRenderer.send("reply",client);
            },500)
        })
    };
    return <>
        <Backdrop open={showSpin} appear="">
            <CircularProgress color="primary" />
        </Backdrop>
        <Box height="100%" display="flex">
            <Box height="100%" width="100%" marginX="20px" display="flex" flexDirection="column">

                <Box display="flex" flexDirection="row" marginY="auto">
                    <Box flex="1 1 auto">
                        <TextField onChange={e=>setisim(e.target.value)} label="İsim" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                    <Box flex="1 1 auto" marginLeft="20px">
                        <TextField onChange={e=>setsoyisim(e.target.value)} label="Soyisim" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY="auto">
                    <Box flex="1 1 auto">
                        <TextField onChange={e=>settelefon(e.target.value)} label="Telefon" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                    <Box flex="1 1 auto" marginLeft="20px">
                        <TextField onChange={e=>setemail(e.target.value)} label="E-Mail Adresi" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY="auto">
                    <Box flex="1 1 auto">
                        <TextField onChange={e=>setaddress(e.target.value)} label="Adres" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                    <Box flex="1 1 auto" marginLeft="20px">
                        <TextField onChange={e=>setbalance(e.target.value)} label="Harici Borç" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                </Box>

                <Box display="flex" flexDirection="row" marginY="auto">
                    <Box flex="1 1 auto">
                        <TextField onChange={e=>setdescript(e.target.value)} label="Açıklama" rows="5" marginBottom="10px" fullWidth ariant="outlined" multiline/>
                    </Box>
                </Box>
               <Box display="flex" marginBottom="10px">
                    <Button variant="outlined" color="primary" style={{marginTop:"auto"}} onClick={saveClient}>
                        Kaydet
                    </Button>
                    <Button variant="outlined" color="secondary" style={{marginTop:"auto",marginLeft:"auto"}} onClick={()=>ipcRenderer.send("reply",false)}>
                        İptal
                    </Button>
               </Box>
            </Box>
        </Box>
    </>
}
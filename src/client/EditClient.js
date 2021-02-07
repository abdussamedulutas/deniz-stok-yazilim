import { useEffect, useState } from "react";
import {Backdrop, Box, Button, CircularProgress, TextField } from "@material-ui/core";
let {ipcRenderer}= window.require("electron");
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
export default function EditClientScreen(props)
{
    let [spinner,setSpinner] = useState(true);
    let
        [id,setid] = useState(""),
        [isim,setisim] = useState(""),
        [soyisim,setsoyisim] = useState(""),
        [telefon,settelefon] = useState(""),
        [email,setemail] = useState(""),
        [address,setaddress] = useState(0),
        [balance,setbalance] = useState(0),
        [age,setage] = useState(""),
        [descript,setDescript] = useState("");
    document.title = "Müşteri Düzenleme";
    useEffect(function(){
        if(props[0])
        {
            ipcRenderer.invoke("db-get-client",props[0]).then(client => {
                setid(client.id)
                setisim(client.isim)
                setsoyisim(client.soyisim)
                settelefon(client.telefon)
                setemail(client.email)
                setaddress(client.address)
                setbalance(client.balance)
                setDescript(client.descript)
                setSpinner(false)
            })
        }
    },[props])
    function updateClient()
    {
        setSpinner(true);
        let client = {
            id:id,
            isim:isim,
            soyisim:soyisim,
            telefon:telefon,
            email:email,
            address:address,
            balance:balance,
            age:age,
            descript:descript
        };
        ipcRenderer.invoke("db-update-client",client).then(function(){
            setSpinner(false);
            setTimeout(function(){
                ipcRenderer.send("reply",client);
            },500)
        })
    };
    return <>
        {spinner ? <Backdrop open={true} appear="">
            <CircularProgress color="primary" />
        </Backdrop> : 
            <Box height="100%" display="flex">
                <Box height="100%" width="100%" marginX="20px" display="flex" flexDirection="column">

                    <Box display="flex" flexDirection="row" marginY="auto">
                        <Box flex="1 1 auto">
                            <TextField
                                onChange={e=>setisim(e.target.value)}
                                value={isim}
                                label="İsim"
                                marginBottom="10px"
                                fullWidth
                                ariant="outlined"
                            />
                        </Box>
                        <Box flex="1 1 auto" marginLeft="20px">
                            <TextField
                                onChange={e=>setsoyisim(e.target.value)}
                                value={soyisim}
                                label="Soyisim"
                                marginBottom="10px"
                                fullWidth
                                ariant="outlined"
                            />
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" marginY="auto">
                        <Box flex="1 1 auto">
                            <TextField
                                onChange={e=>settelefon(e.target.value)}
                                value={telefon}
                                label="Telefon"
                                marginBottom="10px"
                                fullWidth
                                ariant="outlined"
                            />
                        </Box>
                        <Box flex="1 1 auto" marginLeft="20px">
                            <TextField
                                onChange={e=>setemail(e.target.value)}
                                value={email}
                                label="E-Mail Adresi"
                                marginBottom="10px"
                                fullWidth
                                ariant="outlined"
                            />
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" marginY="auto">
                        <Box flex="1 1 auto">
                            <TextField
                                onChange={e=>setaddress(e.target.value)}
                                value={address}
                                label="Adres"
                                marginBottom="10px"
                                fullWidth
                                ariant="outlined"
                            />
                        </Box>
                        <Box flex="1 1 auto" marginLeft="20px">
                            <TextField
                                onChange={e=>setbalance(e.target.value)}
                                value={balance}
                                label="Harici Borç"
                                marginBottom="10px"
                                fullWidth
                                ariant="outlined"
                            />
                        </Box>
                    </Box>

                    <Box display="flex" flexDirection="row" marginY="auto">
                        <Box flex="1 1 auto">
                            <TextField
                                onChange={e=>setDescript(e.target.value)}
                                value={descript}
                                label="Açıklama"
                                rows="5"
                                marginBottom="10px"
                                fullWidth
                                ariant="outlined"
                                multiline
                            />
                        </Box>
                    </Box>
                    <Box display="flex" marginBottom="10px">
                        <Button variant="outlined" color="primary" style={{marginTop:"auto"}} onClick={updateClient}>
                            Kaydet
                        </Button>
                        <Button variant="outlined" color="secondary" style={{marginTop:"auto",marginLeft:"auto"}} onClick={()=>ipcRenderer.send("reply",false)}>
                            İptal
                        </Button>
                    </Box>
                </Box>
            </Box>
            }
        </>
}
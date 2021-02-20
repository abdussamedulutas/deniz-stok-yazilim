import { useState } from "react";
import {Box, Button, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
let {ipcRenderer} = window.require("electron");

export default function AddCustomer(props)
{
    let [errorMessage,setErrorMessage] = useState(false);
    let [successMessage,setSuccessMessage] = useState(false);
    let [showSave,setShowSave] = useState(false);
    let [customer,setDetails] = useState({
        isim:"",
        soyisim:"",
        phone:"",
        email:"",
        balance:"",
        address:"",
        descript:""
    });
    function handleChange(name,value){
        let ncustomer = {
            ...customer,
            [name]:value
        };
        setDetails(ncustomer)
        setErrorMessage(false);
        setSuccessMessage(false);
        setShowSave(ncustomer.isim !== "")
    };
    async function handleClick()
    {
        setErrorMessage(false);
        setSuccessMessage(false);
        if(
            !customer.isim
        ){
            setErrorMessage("Müşteri ismi zorunlu alanlardır");
            return;
        };
        await ipcRenderer.invoke("db",{
            action:"add",
            class:"customer",
            data:customer
        });
        setSuccessMessage("Bilgiler Başarıyla Kaydedildi");
        setTimeout(function(){
            ipcRenderer.send("reply",true)
        },500)
    }

    document.title = "Müşteri Ekleme Formu";
    let styles = {
        marginTop:"auto",
        marginBottom:"auto"
    };

    return <>
        <Box height="100%" display="flex">
            <Box width="350px" height="90vh" margin="auto" display="flex" flexDirection="column">
                <Box style={styles} fontSize="h4.fontSize" marginBottom="50px" textAlign="center">
                    Müşteri Bilgileri
                </Box>
                <Box style={styles} display="flex" flexDirection="row">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField label="Müşteri İsmi" fullWidth ariant="outlined" onKeyUp={e=>handleChange("isim",e.target.value)}/>
                    </Box>
                    <Box marginBottom="10px" marginLeft="10px" flex="1 1 auto">
                        <TextField label="Müşteri Soyismi" fullWidth ariant="outlined" onKeyUp={e=>handleChange("soyisim",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField type="tel" label="Telefon Numarası" fullWidth ariant="outlined" onKeyUp={e=>handleChange("phone",e.target.value)}/>
                    </Box>
                    <Box marginLeft="10px" flex="1 1 auto">
                        <TextField type="mail" label="E-Posta Adresi" fullWidth ariant="outlined" onKeyUp={e=>handleChange("email",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField type="number" label="Harici Borç" fullWidth ariant="outlined" onKeyUp={e=>handleChange("balance",e.target.value)}/>
                    </Box>
                    <Box marginLeft="10px" flex="1 1 auto">
                        <TextField type="address" label="Adresi" fullWidth ariant="outlined" onKeyUp={e=>handleChange("address",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField multiline rows="3" label="Açıklama" fullWidth ariant="outlined" onKeyUp={e=>handleChange("descript",e.target.value)}/>
                    </Box>
                </Box>
                {!successMessage && showSave && <Box style={styles} textAlign="center">
                    <Button variant="outlined" color="primary" style={{marginTop:"auto"}} onClick={handleClick}>
                        Kaydet
                    </Button>
                </Box>}
                <Box style={styles} textAlign="center">
                    {errorMessage ? <Alert severity="warning">{errorMessage}</Alert> : null}
                    {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}
                </Box>
            </Box>
        </Box>
    </>
}
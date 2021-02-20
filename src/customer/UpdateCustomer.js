import { useEffect, useState } from "react";
import {Box, Button, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
let {ipcRenderer} = window.require("electron");

export default function UpdateCustomer(props)
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
    useEffect(function(){
        ipcRenderer.invoke("db",{
            action:"get",
            class:"customer",
            id:props.args[0]
        }).then(_customer => {
            console.log(_customer);
            setDetails(_customer);
            setShowSave(_customer.isim !== "")
        });
    },[props.args]);
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
            action:"update",
            class:"customer",
            id:props.args[0],
            data:customer
        });
        setSuccessMessage("Bilgiler Başarıyla Güncellendi");
        setTimeout(function(){
            ipcRenderer.send("reply",true)
        },500)
    }

    document.title = "Müşteri Güncelleme Formu";
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
                        <TextField value={customer.isim}  label="Müşteri İsmi" fullWidth ariant="outlined" onChange={e=>handleChange("isim",e.target.value)}/>
                    </Box>
                    <Box marginBottom="10px" marginLeft="10px" flex="1 1 auto">
                        <TextField value={customer.soyisim}  label="Müşteri Soyismi" fullWidth ariant="outlined" onChange={e=>handleChange("soyisim",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField value={customer.phone}  type="tel" label="Telefon Numarası" fullWidth ariant="outlined" onChange={e=>handleChange("phone",e.target.value)}/>
                    </Box>
                    <Box marginLeft="10px" flex="1 1 auto">
                        <TextField value={customer.email}  type="mail" label="E-Posta Adresi" fullWidth ariant="outlined" onChange={e=>handleChange("email",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField value={customer.balance}  type="number" label="Harici Borç" fullWidth ariant="outlined" onChange={e=>handleChange("balance",e.target.value)}/>
                    </Box>
                    <Box marginLeft="10px" flex="1 1 auto">
                        <TextField value={customer.address}  type="address" label="Adresi" fullWidth ariant="outlined" onChange={e=>handleChange("address",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField value={customer.descript}  multiline rows="3" label="Açıklama" fullWidth ariant="outlined" onChange={e=>handleChange("descript",e.target.value)}/>
                    </Box>
                </Box>
                {!successMessage && showSave && <Box style={styles} textAlign="center">
                    <Button variant="outlined" color="primary" style={{marginTop:"auto"}} onClick={handleClick}>
                        Güncelle
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
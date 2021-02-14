import { useState } from "react";
import {Box, Button, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
let {ipcRenderer} = window.require("electron");

export default function LoginScreen(props)
{
    let [errorMessage,setErrorMessage] = useState(false);
    let [successMessage,setSuccessMessage] = useState(false);
    let [showSave,setShowSave] = useState(false);
    let [product,setDetails] = useState({
        isim:"",
        marka:"",
        model:"",
        barkod:"",
        satisfiyati:"",
        alisfiyati:"",
        kdv:"",
        renk:"",
        stok:"",
        descript:""
    });
    function handleChange(name,value){
        let nproduct = {
            ...product,
            [name]:value
        };
        setDetails(nproduct)
        setErrorMessage(false);
        setSuccessMessage(false);
        setShowSave(nproduct.isim && parseInt(nproduct.satisfiyati) > 0 && parseInt(nproduct.stok) > 0)
    };
    async function handleClick()
    {
        setErrorMessage(false);
        setSuccessMessage(false);
        if(
            !product.isim||
            !product.satisfiyati
        ){
            setErrorMessage("Ürün ismi ve fiyatı zorunlu alanlardır");
            return;
        };
        await ipcRenderer.invoke("db",{
            action:"add",
            class:"product",
            data:product
        });
        setSuccessMessage("Bilgiler Başarıyla kaydedildi");
        setTimeout(function(){
            ipcRenderer.send("reply",true)
        },500)
    }

    document.title = "Sisteme Ürün Ekleme";
    let styles = {
        marginTop:"auto",
        marginBottom:"auto"
    };

    return <>
        <Box height="100%" display="flex">
            <Box width="350px" height="90vh" margin="auto" display="flex" flexDirection="column">
                <Box style={styles} fontSize="h4.fontSize" marginBottom="50px" textAlign="center">
                    Ürün Bilgileri
                </Box>
                <Box style={styles} display="flex" flexDirection="row">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField label="Ürün İsmi" fullWidth ariant="outlined" onKeyUp={e=>handleChange("isim",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField label="Ürün Markası" fullWidth ariant="outlined" onKeyUp={e=>handleChange("marka",e.target.value)}/>
                    </Box>
                    <Box marginBottom="10px" marginLeft="10px" flex="1 1 auto">
                        <TextField label="Ürün Modeli" fullWidth ariant="outlined" onKeyUp={e=>handleChange("model",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField type="number" label="Ürün Alış Fiyatı" fullWidth ariant="outlined" onKeyUp={e=>handleChange("alisfiyati",e.target.value)}/>
                    </Box>
                    <Box marginLeft="10px" flex="1 1 auto">
                        <TextField type="number" label="Ürün Satış Fiyatı" fullWidth ariant="outlined" onKeyUp={e=>handleChange("satisfiyati",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField type="number" label="Katkı Değer Vegisi" fullWidth ariant="outlined" onKeyUp={e=>handleChange("kdv",e.target.value)}/>
                    </Box>
                    <Box marginLeft="10px" flex="1 1 auto">
                        <TextField type="number" label="Stok Adedi" fullWidth ariant="outlined" onKeyUp={e=>handleChange("stok",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField label="Ürün Barkod" fullWidth ariant="outlined" onKeyUp={e=>handleChange("barkod",e.target.value)}/>
                    </Box>
                    <Box marginLeft="10px" flex="1 1 auto">
                        <TextField label="Ürün Rengi" fullWidth ariant="outlined" onKeyUp={e=>handleChange("renk",e.target.value)}/>
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
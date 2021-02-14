import { useEffect, useState } from "react";
import {Box, Button, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
let {ipcRenderer} = window.require("electron");

export default function UpdateProduct(props)
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
    useEffect(function(){
        ipcRenderer.invoke("db",{
            action:"get",
            class:"product",
            id:props.args[0]
        }).then(_product => setDetails(_product))
    },[props.args[0]]);
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
            action:"update",
            class:"product",
            id:props.args[0],
            data:product
        });
        setSuccessMessage("Bilgiler Başarıyla Güncellendi");
        setTimeout(function(){
            ipcRenderer.send("reply",true)
        },500)
    }

    document.title = "Ürün Güncelleme Formu";
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
                        <TextField value={product.isim} label="Ürün İsmi" fullWidth ariant="outlined" onChange={e=>handleChange("isim",e.target.value)} autoFocus/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField value={product.marka} label="Ürün Markası" fullWidth ariant="outlined" onChange={e=>handleChange("marka",e.target.value)}/>
                    </Box>
                    <Box marginBottom="10px" marginLeft="10px" flex="1 1 auto">
                        <TextField value={product.model} label="Ürün Modeli" fullWidth ariant="outlined" onChange={e=>handleChange("model",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField value={product.alisfiyati} type="number" label="Ürün Alış Fiyatı" fullWidth ariant="outlined" onChange={e=>handleChange("alisfiyati",e.target.value)}/>
                    </Box>
                    <Box marginLeft="10px" flex="1 1 auto">
                        <TextField value={product.satisfiyati} type="number" label="Ürün Satış Fiyatı" fullWidth ariant="outlined" onChange={e=>handleChange("satisfiyati",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField value={product.kdv} type="number" label="Katkı Değer Vegisi (%)" fullWidth ariant="outlined" onChange={e=>handleChange("kdv",e.target.value)}/>
                    </Box>
                    <Box marginLeft="10px" flex="1 1 auto">
                        <TextField value={product.stok} type="number" label="Stok Adedi" fullWidth ariant="outlined" onChange={e=>handleChange("stok",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField value={product.barkod} label="Ürün Barkod" fullWidth ariant="outlined" onChange={e=>handleChange("barkod",e.target.value)}/>
                    </Box>
                    <Box marginLeft="10px" flex="1 1 auto">
                        <TextField value={product.renk} label="Ürün Rengi" fullWidth ariant="outlined" onChange={e=>handleChange("renk",e.target.value)}/>
                    </Box>
                </Box>
                <Box style={styles} display="flex" flexDirection="row" marginBottom="10px">
                    <Box marginBottom="10px" flex="1 1 auto">
                        <TextField value={product.descript} multiline rows="3" label="Açıklama" fullWidth ariant="outlined" onChange={e=>handleChange("descript",e.target.value)}/>
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
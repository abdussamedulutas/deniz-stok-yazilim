import { useState } from "react";
import {Backdrop, Box, Button, CircularProgress, TextField} from "@material-ui/core";
let {ipcRenderer} = window.require("electron");

export default function AddProductScreen()
{
    let
        [name,setname] = useState(""),
        [marka,setmarka] = useState(""),
        [model,setmodel] = useState(""),
        [barcode,setbarcode] = useState(""),
        [price,setprice] = useState(0),
        [kdv,setkdv] = useState(0),
        [color,setcolor] = useState(""),
        [descript,setdescript] = useState(""),
        [stok,setstok] = useState(""),
        [alisfiyati,setalisfiyati] = useState(""),
        [showSpin,setShowSpin] = useState(false);
    document.title = "Yeni Ürün Ekleme";
    function saveProduct()
    {
        setShowSpin(true);
        let product = {
            isim:name,
            marka:marka,
            model:model,
            barkod:barcode,
            birimfiyati:price,
            kdv:kdv,
            renk:color,
            descript:descript
        };
        let stokinfo = {
            stok:stok,
            alisfiyati:alisfiyati
        };
        ipcRenderer.invoke("db-insert-product",product,stokinfo).then(function(){
            setShowSpin(false);
            setTimeout(function(){
                ipcRenderer.send("reply",product);
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
                        <TextField onChange={e=>setname(e.target.value)} label="Ürün Adı" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY="auto">
                    <Box flex="1 1 auto">
                        <TextField onChange={e=>setmarka(e.target.value)} label="Ürün Markası" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                    <Box flex="1 1 auto" marginLeft="20px">
                        <TextField onChange={e=>setmodel(e.target.value)} label="Ürün Modeli" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY="auto">
                    <Box flex="1 1 auto">
                        <TextField onChange={e=>setbarcode(e.target.value)} label="Ürün Barkodu" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                    <Box flex="1 1 auto" marginLeft="20px">
                        <TextField onChange={e=>setalisfiyati(e.target.value)} label="Alış Fiyatı" type="number" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                    <Box flex="1 1 auto" marginLeft="20px">
                        <TextField onChange={e=>setprice(e.target.value)} label="Satış Fiyatı" type="number" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY="auto">
                    <Box flex="1 1 auto">
                        <TextField onChange={e=>setkdv(e.target.value)} label="KDV Oranı" type="number" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                    <Box flex="1 1 auto" marginLeft="20px">
                        <TextField onChange={e=>setcolor(e.target.value)} label="Ürün Rengi" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                    <Box flex="1 1 auto" marginLeft="20px">
                        <TextField onChange={e=>setstok(e.target.value)} label="Stok Adedi" type="number" marginBottom="10px" fullWidth ariant="outlined"/>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY="auto">
                    <Box flex="1 1 auto">
                        <TextField onChange={e=>setdescript(e.target.value)} label="Açıklama" rows="5" marginBottom="10px" fullWidth ariant="outlined" multiline/>
                    </Box>
                </Box>

               <Box display="flex" marginBottom="10px">
                    <Button variant="outlined" color="primary" style={{marginTop:"auto"}} onClick={saveProduct}>
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
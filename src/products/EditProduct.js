import { useEffect, useState } from "react";
import {Backdrop, Box, Button, CircularProgress, TextField} from "@material-ui/core";
let {ipcRenderer} = window.require("electron");

export default function EditProductScreen(props)
{
    let [spinner,setSpinner] = useState(true);

    let
        [id,setid] = useState(),
        [name,setName] = useState(),
        [marka,setMarka] = useState(),
        [model,setModel] = useState(),
        [barcode,setBarcode] = useState(),
        [price,setPrice] = useState(),
        [kdv,setKdv] = useState(),
        [color,setColor] = useState(),
        [stok,setstok] = useState(),
        [descript,setDescript] = useState();
    document.title = "Ürün Düzenleme";

    useEffect(function(){
        if(props[0])
        {
            ipcRenderer.invoke("db-get-product",props[0]).then(product => {
                setid(product.id)
                setName(product.isim)
                setMarka(product.marka)
                setModel(product.model)
                setBarcode(product.barkod)
                setPrice(product.birimfiyati)
                setKdv(product.kdv)
                setColor(product.renk)
                setDescript(product.descript)
                setstok(product.stok)
                setSpinner(false)
            })
        }
    },[props])
    function updateProduct()
    {
        let product = {
            id:id,
            isim:name,
            marka:marka,
            model:model,
            barkod:barcode,
            birimfiyati:price,
            kdv:kdv,
            renk:color,
            descript:descript
        };
        ipcRenderer.invoke("db-update-product",product).then(function(){
            setTimeout(function(){
                ipcRenderer.send("reply",product);
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
                            onChange={e=>setName(e.target.value)}
                            value={name}
                            label="Ürün Adı"
                            marginBottom="10px"
                            fullWidth
                            ariant="outlined"
                        />
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY="auto">
                    <Box flex="1 1 auto">
                        <TextField
                            onChange={e=>setMarka(e.target.value)}
                            value={marka}
                            label="Ürün Markası"
                            marginBottom="10px"
                            fullWidth
                            ariant="outlined"
                        />
                    </Box>
                    <Box flex="1 1 auto" marginLeft="20px">
                        <TextField
                            onChange={e=>setModel(e.target.value)}
                            value={model}
                            label="Ürün Modeli"
                            marginBottom="10px"
                            fullWidth
                            ariant="outlined"
                        />
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY="auto">
                    <Box flex="1 1 auto">
                        <TextField
                            onChange={e=>setBarcode(e.target.value)}
                            value={barcode}
                            label="Ürün Barkodu"
                            marginBottom="10px"
                            fullWidth
                            ariant="outlined"
                        />
                    </Box>
                    <Box flex="1 1 auto" marginLeft="20px">
                        <TextField
                            onChange={e=>setPrice(e.target.value)}
                            value={price}
                            type="number"
                            label="Ürün Fiyatı"
                            marginBottom="10px"
                            fullWidth
                            ariant="outlined"
                        />
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY="auto">
                    <Box flex="1 1 auto">
                        <TextField
                            onChange={e=>setKdv(e.target.value)}
                            value={kdv}
                            type="number"
                            label="KDV Oranı"
                            marginBottom="10px"
                            fullWidth
                            ariant="outlined"
                        />
                    </Box>
                    <Box flex="1 1 auto" marginLeft="20px">
                        <TextField
                            onChange={e=>setColor(e.target.value)}
                            value={color}
                            label="Ürün Rengi"
                            marginBottom="10px"
                            fullWidth
                            ariant="outlined"
                        />
                    </Box>
                    <Box flex="1 1 auto" marginLeft="20px">
                        <TextField
                            type="number"
                            onChange={e=>setstok(e.target.value)}
                            value={stok}
                            label="Stok Adedi"
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
                    <Button variant="outlined" color="primary" style={{marginTop:"auto"}} onClick={updateProduct}>
                        Güncelle
                    </Button>
                    <Button variant="outlined" color="secondary" style={{marginTop:"auto",marginLeft:"auto"}} onClick={()=>ipcRenderer.send("reply",false)}>
                        İptal
                    </Button>
               </Box>
            </Box>
        </Box>}
    </>
}
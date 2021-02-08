import { Box, Button, IconButton, Menu,MenuItem } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Add, Beenhere, MoreVert } from "@material-ui/icons";
import { useState } from "react";

export default function ProductTab()
{
    let verticalCenter =  {marginTop:"auto",marginBottom:"auto"}
    return <Box display="flex" flexDirection="column" height="100%">
        <Box display="flex" marginBottom="20px">
            <Beenhere style={verticalCenter}/>
            <h3 style={{marginLeft:"10px",...verticalCenter}}>Tüm Ürünler</h3>
            <Button
                variant="contained"
                color="primary" 
                style={{marginLeft:"auto",...verticalCenter}}
            >
                <Add />
                Ürün Ekle 
            </Button>
        </Box>
        <Box flex="1 1 auto" display="flex">
            <DataGrid
                checkboxSelection="true"
                showColumnRightBorder={true}
                showCellRightBorder={true}
                columns={[
                    {field:"id",headerName:"ID",hide:true},
                    {field:"marka",headerName:"Marka",flex:20},
                    {field:"model",headerName:"Model",flex:20},
                    {field:"fiyat",headerName:"Fiyat",flex:10,type:"number"},
                    {field:"renk",headerName:"Renk",flex:20},
                    {field:"kdv",headerName:"K.D.V.",flex:10,type:"number"},
                    {
                        field:"I",
                        headerName:" ",
                        renderCell:(e)=> <ProductTabOptions />,
                        flex:5,
                        sortable:false,
                        filterable:false
                    }
                ]}
                rows={
                    Array(1000).fill(0).map(function(_,index){
                        return {
                            id:index,
                            marka:randMarka(),
                            model:randModel(),
                            fiyat:randFiyat(),
                            renk:randRenk(),
                            kdv:rendKdv()
                        }
                    })
                }
            />
        </Box>
    </Box>
}
function rand(min,max)
{
    return parseInt(min + (Math.random() * max))
}
function randArray(arr)
{
    return arr[
        rand(0,arr.length)
    ]
}
function randMarka(){
    return randArray([
        "Samsung",
        "Sony",
        "Pixel",
        "Casper",
        "Nokia"
    ])
};
function randModel(){
    return randArray([
        'A','B','C','D','E','J','Z'
    ])+rand(1,5)
};
function randFiyat(){
    return rand(1000,9000) + "TL"
};
function randRenk(){
    return randArray([
        "mavi",
        "beyaz",
        "gri",
        "siyah",
        "mor",
        "lacivery",
        "sarı",
        "yeşil",
        "turuncu"
    ])
};
function rendKdv(){
    return randArray([8,20,32,45,70]) + "%"
};
function ProductTabOptions()
{
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    return <>
    <IconButton
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
            Düzenle
        </MenuItem>
        <MenuItem onClick={handleClose}>
            Sil
        </MenuItem>
      </Menu>
    </>
}
import { Box, Button, IconButton, Menu,MenuItem } from "@material-ui/core";
import { ApiContext, DataGrid } from "@material-ui/data-grid";
import { Add, Beenhere, Description, MoreVert, PinDropSharp, Remove } from "@material-ui/icons";
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
        <ProductGrid />
    </Box>
}
function ProductTabOptions(props)
{
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleEdit = e => {
        handleClick();
        props.onEditItem && props.onEditItem();
    };
    const handleDelete = e => {
        handleClick();
        props.onDeleteItem && props.onDeleteItem();
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
        <MenuItem onClick={handleEdit}>
            Düzenle
        </MenuItem>
        <MenuItem onClick={handleDelete}>
            Sil
        </MenuItem>
      </Menu>
    </>
}

function ProductGrid(props)
{
    let [selectedItem,setSelectedItems] = useState([]);
    return <>
    <Box flex="1 1 auto" display="flex">
        <DataGrid
            checkboxSelection="true"
            showColumnRightBorder={true}
            showCellRightBorder={true}
            onSelectionChange={e=>setSelectedItems(e.rowIds)}
            columns={[
                {
                    field:"id",
                    headerName:"ID",
                    hide:true
                },
                {
                    field:"marka",
                    headerName:"Marka",
                    flex:20
                },
                {
                    field:"model",
                    headerName:"Model",
                    flex:20
                },
                {
                    field:"fiyat",
                    headerName:"Fiyat",
                    flex:10,
                    type:"number",
                    renderCell:(e)=> e.value + "TL",
                },
                {
                    field:"renk",
                    headerName:"Renk",
                    flex:20
                },
                {
                    field:"kdv",
                    headerName:"K.D.V.",
                    flex:10,
                    type:"number",
                    renderCell:(e)=> e.value + "% (" + (parseFloat(e.row.fiyat) * parseFloat("0."+e.value)) + "TL)",
                },
                {
                    field:"stok",
                    headerName:"Stok Adedi",
                    flex:10,
                    type:"number",
                    renderCell:(e)=> e.value + " Adet",
                },
                {
                    field:"I",
                    headerName:" ",
                    renderCell:(e)=> <ProductTabOptions />,
                    flex:5,
                    sortable:false,
                    filterable:false
                }
            ]}
            rows={props.row}
        />
    </Box>
    {selectedItem.length != 0 && <Box flex="0 0 auto" display="flex">
        <Button variant="contained" color="secondary">
            <Remove />
            Seçileni Sil
        </Button>
        <Button variant="contained" color="secondary">
            <Description />
            Fatura Oluştur
        </Button>
    </Box>}
    </>
}
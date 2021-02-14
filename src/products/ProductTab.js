import { useState } from "react";
import { Box, Button, IconButton, InputAdornment, Menu,MenuItem, TextField } from "@material-ui/core";
import { ApiContext, DataGrid } from "@material-ui/data-grid";
import { Add, Beenhere, Description, MoreVert, PinDropSharp, Remove, Search } from "@material-ui/icons";
let {ipcRenderer} = window.require("electron");

export default function ProductTab()
{
    let verticalCenter =  {marginTop:"auto",marginBottom:"auto"};
    let [rows,setRows] = useState([{
        id:6,
        marka:"Samsung",
        model:"A2 Core",
        fiyat:"1500",
        renk:"Lacivert",
        kdv:"14.5",
        stok:14
    },{
        id:7,
        marka:"Vodafone",
        model:"Red MI 12",
        fiyat:"4000",
        renk:"Beyaz",
        kdv:"8",
        stok:25
    }]);

    async function updateData()
    {
        let rows = await ipcRenderer.invoke("db",{
            action:"list",
            class:"product"
        });
        setRows(rows);
    }
    async function handleProductAdd()
    {
        await ipcRenderer.invoke("modal","addproduct");
        await updateData();
    }

    return <Box display="flex" flexDirection="column" height="100%">
        <Box display="flex" marginBottom="20px">
            <Beenhere style={verticalCenter}/>
            <h3 style={{marginLeft:"10px",...verticalCenter}}>Tüm Ürünler</h3>
            <Box marginLeft="auto" marginY="auto">
                Arama:
            </Box>
            <TextField
                InputProps={{
                    startAdornment:(
                        <InputAdornment position="start">
                            <Search/>
                        </InputAdornment>
                    )
                }}
                style={{marginLeft:"10px",...verticalCenter}}
            />
            <Button
                variant="contained"
                color="primary" 
                style={{marginLeft:"10px",...verticalCenter}}
                onClick={handleProductAdd}
            >
                <Add />
                Ürün Ekle 
            </Button>
        </Box>
        <ProductGrid
            row={rows}
        />
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
    function p(k){
        k = k.toString().split('.');
        return k[0] + (k[1]?'.'+k[1].slice(0,2):'')
    }
    const handleSelected = e => {
        setSelectedItems(e.rowIds);
        props.onSelectionChanged && props.onSelectionChanged(e.rowIds);
    };
    const handleEdit = e => {
        props.onEditItem && props.onEditItem(selectedItem);
    };
    const handleDelete = e => {
        props.onDeleteItem && props.onDeleteItem(selectedItem);
    };
    return <>
    <Box flex="1 1 auto" display="flex">
        <DataGrid
            checkboxSelection="true"
            showColumnRightBorder={true}
            showCellRightBorder={true}
            onSelectionChange={handleSelected}
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
                    renderCell:(e)=> e.value + "% (" + p(parseFloat(e.row.fiyat) * parseFloat("0."+e.value)) + "TL)",
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
                    renderCell:(e)=> <ProductTabOptions onEditItem={handleEdit} onDeleteItem={handleDelete} />,
                    flex:5,
                    sortable:false,
                    filterable:false
                }
            ]}
            rows={props.row}
        />
    </Box>
    {selectedItem.length != 0 && <Box flex="0 0 auto" display="flex" marginTop="10px">
        <Button variant="contained" color="secondary" onClick={handleDelete}>
            <Remove />
            Seçileni Sil
        </Button>
        {selectedItem.length == 1 && <Button variant="contained" color="secondary" style={{backgroundColor:"#00dd00",marginLeft:"10px"}} onClick={handleEdit}>
            <Description />
            Seçileni Düzenle
        </Button>}
        <Button variant="outlined" style={{marginLeft:"10px"}} onClick={handleEdit}>
            <Description />
            Fatura Oluştur
        </Button>
    </Box>}
    </>
}
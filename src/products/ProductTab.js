import { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Menu,MenuItem, TextField } from "@material-ui/core";
import { ApiContext, DataGrid } from "@material-ui/data-grid";
import { Add, Beenhere, Description, MoreVert, PinDropSharp, Remove, Search } from "@material-ui/icons";
let {ipcRenderer} = window.require("electron");

export default function ProductTab()
{
    let verticalCenter =  {marginTop:"auto",marginBottom:"auto"};
    let [rows,setRows] = useState([]);
    let [deleteRows,setDeleteRow] = useState([]);

    async function updateData()
    {
        let rows = await ipcRenderer.invoke("db",{
            action:"list",
            class:"product"
        });
        setRows(rows);
    };
    updateData();
    async function handleProductAdd()
    {
        await ipcRenderer.invoke("modal","addproduct");
        await updateData();
    }
    async function handleProductEdit(id)
    {
        console.log(arguments);
        await ipcRenderer.invoke("modal","updateproduct",id);
        await updateData();
    }
    async function handleDelete(ids)
    {
        console.log(ids);
        setDeleteRow(ids);
    }
    async function handleDeleteProduct()
    {
        await ipcRenderer.invoke("db",{
            action:"delete",
            class:"product",
            id:deleteRows instanceof Array ? deleteRows : [deleteRows]
        });
        await updateData();
        setDeleteRow([]);
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
            onDeleteItem={handleDelete}
            onEditItem={handleProductEdit}
            row={rows}
        />
        <Dialog
            open={deleteRows.length != 0}
            onClose={() => setDeleteRow([])}
        >
            <DialogTitle>Dikkat !</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {deleteRows.length} adet ürünü sistemden kaldırmak istiyor musunuz?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => setDeleteRow([])}>
                    İptal
                </Button>
                <Button color="secondary" onClick={handleDeleteProduct}>
                    Sil
                </Button>
            </DialogActions>
        </Dialog>

    </Box>
}
function ProductTabOptions(props)
{
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (e) => {
        setAnchorEl(e.target);
    };
    const handleEdit = e => {
        handleClose();
        props.onEditItem && props.onEditItem(props.id);
    };
    const handleDelete = e => {
        handleClose();
        props.onDeleteItem && props.onDeleteItem([props.id]);
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
    function p(fiyat,vergi){
        let perctangle = parseFloat(vergi) / 100;
        let result = fiyat * perctangle;
        let k = result.toString().split('.');
        return k[0] + (k[1]?'.'+k[1].slice(0,2):'')
    }
    const handleSelected = e => {
        setSelectedItems(e.rowIds);
        props.onSelectionChanged && props.onSelectionChanged(e.rowIds);
    };
    const handleEdit = e => {
        props.onEditItem && props.onEditItem(typeof e == "number" ? e : selectedItem[0]);
    };
    const handleDelete = e => {
        props.onDeleteItem && props.onDeleteItem(e instanceof Array ? e : selectedItem);
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
                    field:"satisfiyati",
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
                    renderCell:(e)=> e.value + "% (" + p(e.row.satisfiyati,e.value) + "TL)",
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
                    renderCell:(e)=> <ProductTabOptions row={e.row.id} onEditItem={handleEdit} onDeleteItem={handleDelete} />,
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
        <Button variant="outlined" style={{marginLeft:"10px"}} onClick={handleEdit} >
            <Description />
            Fatura Oluştur
        </Button>
    </Box>}
    </>
}
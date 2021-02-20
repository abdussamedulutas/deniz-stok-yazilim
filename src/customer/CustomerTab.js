import { useState, useEffect} from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Menu,MenuItem, TextField } from "@material-ui/core";
import {  DataGrid } from "@material-ui/data-grid";
import { Add, AssignmentInd, Description, MoreVert, Remove, Search } from "@material-ui/icons";
let {ipcRenderer} = window.require("electron");

export default function CustomerTab()
{
    let verticalCenter =  {marginTop:"auto",marginBottom:"auto"};
    let [rows,setRows] = useState([]);
    let [deleteRows,setDeleteRow] = useState([]);

    async function updateData()
    {
        let rows = await ipcRenderer.invoke("db",{
            action:"list",
            class:"customer"
        });
        setRows(rows);
    };
    useEffect(function(){
        updateData()
    },[]);
    async function doSearch(word)
    {
        if(word.length === 0){
            return updateData()
        };
        let _rows = await ipcRenderer.invoke("db",{
            action:"search",
            class:"customer",
            limit:1000,
            data:{
                isim:word,
                soyisim:word,
                email:word,
                address:word,
                descript:word
            }
        });
        console.log(_rows);
        setRows(_rows);
    };
    async function handleCustomerAdd()
    {
        await ipcRenderer.invoke("modal","addcustomer");
        await updateData();
    }
    async function handleCustomerEdit(id)
    {
        await ipcRenderer.invoke("modal","updatecustomer",id);
        await updateData();
    }
    async function handleDelete(ids)
    {
        setDeleteRow(ids);
    }
    async function handleDeleteCustomer()
    {
        await ipcRenderer.invoke("db",{
            action:"delete",
            class:"customer",
            id:deleteRows instanceof Array ? deleteRows : [deleteRows]
        });
        await updateData();
        setDeleteRow([]);
    }
    return <Box display="flex" flexDirection="column" height="100%">
        <Box display="flex" marginBottom="20px">
            <AssignmentInd style={verticalCenter}/>
            <h3 style={{marginLeft:"10px",...verticalCenter}}>Tüm Müşteriler</h3>
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
                onKeyUp={e => doSearch(e.target.value)}
                style={{marginLeft:"10px",...verticalCenter}}
            />
            <Button
                variant="contained"
                color="primary" 
                style={{marginLeft:"10px",...verticalCenter}}
                onClick={handleCustomerAdd}
            >
                <Add />
                Müşteri Ekle 
            </Button>
        </Box>
        <CustomerGrid
            onDeleteItem={handleDelete}
            onEditItem={handleCustomerEdit}
            row={rows}
        />
        <Dialog
            open={deleteRows.length !== 0}
            onClose={() => setDeleteRow([])}
        >
            <DialogTitle>Dikkat !</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {deleteRows.length} adet müşteri sistemden kaldırmak istiyor musunuz?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => setDeleteRow([])}>
                    İptal
                </Button>
                <Button color="secondary" onClick={handleDeleteCustomer}>
                    Sil
                </Button>
            </DialogActions>
        </Dialog>

    </Box>
}
function CustomerTabOptions(props)
{
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (e) => {
        setAnchorEl(e.target);
    };
    const handleEdit = e => {
        handleClose();
        props.onEditItem && props.onEditItem(props.row);
    };
    const handleDelete = e => {
        handleClose();
        props.onDeleteItem && props.onDeleteItem([props.row]);
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

function CustomerGrid(props)
{
    let [selectedItem,setSelectedItems] = useState([]);
    const handleSelected = e => {
        setSelectedItems(e.rowIds);
        props.onSelectionChanged && props.onSelectionChanged(e.rowIds);
    };
    const handleEdit = e => {
        props.onEditItem && props.onEditItem(selectedItem[0]);
    };
    const handleEditMenu = e => {
        props.onEditItem && props.onEditItem(e);
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
                    field:"isim",
                    headerName:"İsim Soyisim",
                    flex:20,
                    renderCell:(e)=> `${e.row.isim} ${e.row.soyisim}`,
                },  
                {
                    field:"phone",
                    headerName:"Telefon Numarası",
                    flex:10,
                    type:"number"
                },
                {
                    field:"balance",
                    headerName:"Borcu",
                    flex:10,
                    type:"number",
                    renderCell:(e)=> e.value + "TL",
                },
                {
                    field:"address",
                    headerName:"Adresi",
                    flex:20
                },
                {
                    field:"I",
                    headerName:" ",
                    renderCell:(e)=> <CustomerTabOptions row={e.row.id} onEditItem={handleEditMenu} onDeleteItem={handleDelete} />,
                    flex:5,
                    sortable:false,
                    filterable:false
                }
            ]}
            rows={props.row}
        />
    </Box>
    {selectedItem.length !== 0 && <Box flex="0 0 auto" display="flex" marginTop="10px">
        <Button variant="contained" color="secondary" onClick={handleDelete}>
            <Remove />
            Seçileni Sil
        </Button>
        {selectedItem.length === 1 && <Button variant="contained" color="secondary" style={{backgroundColor:"#00dd00",marginLeft:"10px"}} onClick={handleEdit}>
            <Description />
            Seçileni Düzenle
        </Button>}
    </Box>}
    </>
}
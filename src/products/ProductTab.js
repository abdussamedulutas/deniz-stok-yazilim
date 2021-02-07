import {
    Box,
	Button,
	Dialog,
	DialogActions,
	DialogContentText,
	DialogContent,
	DialogTitle,
	IconButton,
	InputAdornment,
	Menu,MenuItem,
    TextField,
    Snackbar,
    Slide
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Add, Beenhere, MoreVert, Remove, Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import "moment/locale/tr";
import moment from "moment";
import { Alert } from "@material-ui/lab";

let { ipcRenderer } = window.require("electron");
moment().locale("tr")
export default function ProductTab(props)
{
    let [datas,setData] = useState([]);
    let [update,letUpdate] = useState(0);
    let [selectedRows,setSelectedRows] = useState([]);
    let [removeModal,enableRemoveModal] = useState(false);
    let [messager,setMessager] = useState({open:false});


    useEffect(function(){
        ipcRenderer.invoke("db-get-products",{limit:1000}).then(function(_datas){
            setData(_datas)
        })
    },[update]);
    let verticalCenter =  {marginTop:"auto",marginBottom:"auto"};
    let verticalCenterR =  {...verticalCenter,marginRight:"15px"};

    function search(e)
    {
        clearInterval(search.timer);
        if(e.target.value)
        {
            search.timer = setTimeout(function(){
                ipcRenderer.invoke("db-get-products",{search:e.target.value,limit:1000}).then(function(_datas){
                    setData(_datas)
                })
            },250)
        }else{
            ipcRenderer.invoke("db-get-products",{limit:1000}).then(function(_datas){
                setData(_datas)
            })
        }
    };
    function removeBtn(id)
    {
        if(typeof id == "string") setSelectedRows([id]);
        enableRemoveModal(true);
    }
    async function editBtn(id)
    {
        await editProductModal(id);
        letUpdate(update + 1);
    }
    
    async function acceptDelete()
    {
        await ipcRenderer.invoke("db-delete-products",selectedRows);
        enableRemoveModal(false);
        letUpdate(update + 1);
        setMessager({
            open:true,
            message:"Silme işlemi başarılı !",
            status: "success"
        })
    }
    function cancelDelete()
    {
        enableRemoveModal(false);
    }
    search.timer = null;

    return <>
        <Box display="flex" flexDirection="column" height="100%">
            <Box display="flex" marginBottom="20px">
                <Beenhere style={verticalCenter}/>
                <h3 style={{marginLeft:"10px",...verticalCenter,marginRight:"auto"}}>Tüm Ürünler</h3>
                <div
                    style={verticalCenterR}
                >
                    Arama
                </div>
                <TextField
                    InputProps={{
                        startAdornment:<InputAdornment position="start"><Search /></InputAdornment>,
                    }}
                    style={verticalCenterR}
                    onKeyUp={search}
                    marginRight="10px"
                />
                <Button
                    variant="contained"
                    color="primary" 
                    style={verticalCenter}
                    onClick={async () => {
                        await addProductModal();
                        letUpdate(update + 1);
                    }}
                >
                    <Add />
                    Ürün Ekle 
                </Button>
            </Box>
            <Box flex="1 1 auto" display="flex">
                <ProductDataGrid
                    data={datas}
                    selectEvent={p => setSelectedRows(p)}
                    onDeleteProduct={removeBtn}
                    onEditProduct={editBtn}
                />
            </Box>
            {selectedRows.length != 0 && <Box flex="0 0 40px" display="flex" marginTop="20px">
                <Button variant="contained" color="secondary" onClick={removeBtn}><Remove /> Hepsini Sil</Button>
            </Box>}
        </Box>
        {messager?.open && <Snackbar
            open={true}
            autoHideDuration={messager.duration}
            onClose={()=>setMessager(false)}
            TransitionComponent={props => <Slide {...props} direction="up" />}
            message={messager.message}
        />}
        <RemoveHelperModal
            count={selectedRows.length || 1}
            open={removeModal}
            cancel={cancelDelete}
            accept={acceptDelete}
        />
    </>
}
function RemoveHelperModal(props)
{
    return <>
        <Dialog
            open={props.open}
            onClose={props.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Ürün Silme İşlemi</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.count} adet ürünü gerçekten silmek istiyor musunuz ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.cancel} color="primary" autoFocus>
                    İptal
                </Button>
                <Button onClick={props.accept} color="secondary">
                    Evet, {props.count} öğeyi Sil
                </Button>
            </DialogActions>
        </Dialog>
    </>;
}
function ProductDataGrid(props)
{
    return <DataGrid
        onSelectionChange={p=>props?.selectEvent(p.rowIds)}
        checkboxSelection="true"
        showColumnRightBorder={true}
        showCellRightBorder={true}
        columns={[
            {
                field:"id",
                headerName:"ID",
                hide:true
            },
            {
                field:"isim",
                headerName:"İsim",
                flex:30
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
                field:"birimfiyat",
                headerName:"Fiyat",
                renderCell:(e) => e.row.birimfiyati + " TL",
                flex:10,
                sortComparator:(v1,v2)=> onlyNum(v1) - onlyNum(v2)
            },
            {
                field:"renk",
                headerName:"Renk",
                flex:20
            },
            {
                field:"kdv",
                headerName:"K.D.V.",
                flex:20,
                sortComparator:(v1,v2)=> onlyNum(v1) - onlyNum(v2),
                renderCell:e => e.row.kdv + "%",
            },
            {
                field:"createdate",
                headerName:"Ekleme Tarihi",
                renderCell: e => moment(e.row.createdate).fromNow(),
                flex:10
            },
            {
                field:"I",
                headerName:" ",
                renderCell:(e)=> <ProductTabOptions onDeleteProduct={i=>props.onDeleteProduct(e.row.id)} onEditProduct={i=>props.onEditProduct(e.row.id)}/>,
                flex:5,
                sortable:false,
                filterable:false
            }
        ]}
        rows={props.data}
    />
}
function onlyNum(t)
{
    try{
        return parseFloat(/([\d\.\,]+)/i.exec(t)[1])
    }catch(i){
        let T = parseFloat(t);
        if(Number.isNaN(T)){
            T = new Number(t);
            if(Number.isNaN(T)){
                return 0
            }else return T
        }else return T
    }
}
function ProductTabOptions(props)
{
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    function Edit()
    {
        handleClose();
        props.onEditProduct && props.onEditProduct();
    }
    function Delete()
    {
        handleClose();
        props.onDeleteProduct && props.onDeleteProduct();
    }
    
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
        <MenuItem onClick={Edit}>
            Düzenle
        </MenuItem>
        <MenuItem onClick={Delete}>
            Sil
        </MenuItem>
      </Menu>
    </>
}

async function addProductModal()
{
    await ipcRenderer.invoke("addproduct-modal")
}
async function editProductModal(id)
{
    await ipcRenderer.invoke("editproduct-modal",id)
}
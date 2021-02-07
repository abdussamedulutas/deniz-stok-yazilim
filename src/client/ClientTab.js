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
import { Add, AssignmentInd, MoreVert, Remove, Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import "moment/locale/tr";
import moment from "moment";
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
        ipcRenderer.invoke("db-get-clients",{limit:1000}).then(function(_datas){
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
                ipcRenderer.invoke("db-get-clients",{search:e.target.value,limit:1000}).then(function(_datas){
                    setData(_datas)
                })
            },250)
        }else{
            ipcRenderer.invoke("db-get-clients",{limit:1000}).then(function(_datas){
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
        await editClientModal(id);
        letUpdate(update + 1);
    }
    async function acceptDelete()
    {
        await ipcRenderer.invoke("db-delete-clients",selectedRows);
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
                <AssignmentInd style={verticalCenter}/>
                <h3 style={{marginLeft:"10px",...verticalCenter,marginRight:"auto"}}>Tüm Müşteriler</h3>
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
                        await addClientModal();
                        letUpdate(update + 1);
                    }}
                >
                    <Add />
                    Müşteri Ekle 
                </Button>
            </Box>
            <Box flex="1 1 auto" display="flex">
                <ProductDataGrid
                    data={datas}
                    selectEvent={p => setSelectedRows(p)}
                    onDeleteProduct={removeBtn}
                    onEditClient={editBtn}
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
            <DialogTitle id="alert-dialog-title">Müşteri Silme İşlemi</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.count} adet müşteriyi gerçekten silmek istiyor musunuz ?
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
                renderCell:e => e.row.isim + " " +e.row.soyisim,
                flex:30
            },
            {
                field:"telefon",
                headerName:"Telefon No.",
                flex:20
            },
            {
                field:"email",
                headerName:"E-Mail Adresi",
                flex:20
            },
            {
                field:"address",
                headerName:"Adres",
                flex:20
            },
            {
                field:"balance",
                headerName:"Borç",
                flex:10,
                renderCell:(e) => e.row.balance + " TL",
                sortComparator:(v1,v2)=> onlyNum(v1) - onlyNum(v2)
            },
            {
                field:"I",
                headerName:" ",
                renderCell:(e)=> <ClientTabOptions onDeleteClient={i=>props.onDeleteProduct(e.row.id)} onEditClient={i=>props.onEditClient(e.row.id)} />,
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
function ClientTabOptions(props)
{
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    function Edit()
    {
        handleClose();
        props.onEditClient && props.onEditClient();
    }
    function Delete()
    {
        handleClose();
        props.onDeleteClient && props.onDeleteClient();
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

async function addClientModal()
{
    await ipcRenderer.invoke("addclient-modal")
}
async function editClientModal(id)
{
    await ipcRenderer.invoke("editclient-modal",id)
}
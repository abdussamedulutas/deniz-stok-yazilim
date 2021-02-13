import {Tab, Tabs,Box, Divider,Icon} from "@material-ui/core";
import {
    AssignmentInd, Beenhere, CloudDownloadOutlined, Description, History, Person, PhoneInTalk, SaveAlt, Settings, ShoppingCart
} from "@material-ui/icons";
import "./styles/default.css";
import { useState } from "react";


import ProductTab from "./products/ProductTab";

export default function MainScreen()
{
    let [value,setValue] = useState(1);
    function handleChange(a,newValue){
        console.log(newValue);
        setValue(newValue)
    }
    return <Box display="flex" flexBasis="row" height="100%" overflow="auto">
        <Box flex="0 0 auto" width="200px" height="100%" overflow="auto" style={{boxShadow:"0 0 60px -30px black"}}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                scrollButtons="auto"
                onChange={handleChange}
                style={{height:"100%"}}
            >
                <Tab tabIndex="0" label="Faturalar" icon={<Description/>} />
                <Tab tabIndex="1" label="Ürünler" icon={<Beenhere/>} />
                <Tab tabIndex="2" label="Müşteriler" icon={<AssignmentInd/>} />
                <Tab tabIndex="3" label="Stoklar" icon={<SaveAlt />} />
                <Tab tabIndex="4" label="Satıcılar" icon={<ShoppingCart/>} />
                <Divider />
                <Tab tabIndex="5" label="Kullanıcılar" icon={<Person/>} />
                <Tab tabIndex="6" label="Telefon Numaraları" icon={<PhoneInTalk/>}/>
                <Divider />
                <Tab tabIndex="7" label="Son işlemler" icon={<History/>} />
                <Tab tabIndex="8" label="Yedekleme" icon={<Icon className="fa fa-refresh fa-2x"/>} />
                <Tab tabIndex="9" label="Güncellemeler" icon={<CloudDownloadOutlined/>} />
                <Tab tabIndex="10" label="Ayarlar" icon={<Settings/>}/>
            </Tabs>
        </Box>
        <Box flex="1 1 auto" padding="20px">
            <TabPanel value={value} index={0} title="Faturalar">
                0
            </TabPanel>
            <TabPanel value={value} index={1} title="Ürünler">
                <ProductTab />
            </TabPanel>
            <TabPanel value={value} index={2} title="Müşteriler">
                2
            </TabPanel>
            <TabPanel value={value} index={3} title="Stoklar">
                3
            </TabPanel>
            <TabPanel value={value} index={4} title="Satıcılar">
                4
            </TabPanel>
            <TabPanel value={value} index={6} title="Kullanıcılar">
                5
            </TabPanel>
            <TabPanel value={value} index={7} title="Telefon Numaraları">
                5
            </TabPanel>
            <TabPanel value={value} index={9} title="Son işlemler">
                6
            </TabPanel>
            <TabPanel value={value} index={10} title="Yedekleme">
                6
            </TabPanel>
            <TabPanel value={value} index={11} title="Güncellemeler">
                7
            </TabPanel>
            <TabPanel value={value} index={12} title="Ayarlar">
                7
            </TabPanel>
        </Box>
    </Box>;
}
function TabPanel(props)
{
    let isActive = props.value === props.index;
    if(isActive) document.title = props.title;
    return <Box display={isActive ? "block" : "none"} overflow="auto" height="100%">
        {props.children}
    </Box>;
}
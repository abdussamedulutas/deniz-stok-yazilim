import { render } from "react-dom";
import {Box, Button, InputLabel, TextField, Typography} from "@material-ui/core";
import "./styles/Login.css";

function LoginScreen()
{
    document.title = "Kullanıcı Girişi";
    let styles = {
        marginTop:"auto",
        marginBottom:"auto"
    };
    return <>
        <Box height="100%" display="flex">
            <Box width="300px" height="350px" margin="auto" display="flex" flexDirection="column">
                <Box style={styles} fontSize="h4.fontSize" marginBottom="10px" textAlign="center">
                    Kullanıcı Hesabı
                </Box>
                <Box style={styles}>
                    <InputLabel>
                        Adınız:
                    </InputLabel>
                    <TextField marginBottom="10px" fullWidth/>
                </Box>
                <Box style={styles}>
                    <InputLabel>
                        Şifreniz:
                    </InputLabel>
                    <TextField marginBottom="10px" fullWidth/>
                </Box>
               <Box style={styles} textAlign="center">
                    <Button variant="outlined" color="primary" style={{marginTop:"auto"}}>
                        Kaydet
                    </Button>
               </Box>
            </Box>
        </Box>
    </>
}


render(
    LoginScreen(),
    document.querySelector("#root")
);
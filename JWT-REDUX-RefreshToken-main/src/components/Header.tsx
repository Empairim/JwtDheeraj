import { AppBar, Container, Toolbar } from "@mui/material"
import { Outlet } from "react-router-dom"


const Header =()=>{
    return (
        <>
            <AppBar position="static" sx={{backgroundColor:"#fff"}}>
                <Container maxWidth='lg'>
                    <Toolbar onClick={()=> alert('Working /')}>
                        SNVA Technologies
                    </Toolbar>
                </Container>

            </AppBar>
        </>
    )
}

export default Header
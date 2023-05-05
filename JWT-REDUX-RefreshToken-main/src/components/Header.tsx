import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"
import { useLogoutUserMutation } from "../redux/api/authApi"
import { useAppSelector } from "../redux/store"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { LoadingButton } from "@mui/lab"


const Header = () => {

    const user = useAppSelector((state) => state.userState.user)
    const [logoutUser, { isLoading, isSuccess, error, isError }] = useLogoutUserMutation();
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            window.localStorage.href = '/login'
        }
        if (isError) {
            if (true) {
                (error as any).data.error.forEach((el: any) => toast.error((error as any).data.message, { position: "top-right" }));
            }
            else {
                toast.error((error as any).data.message, {
                    position: "top-right"
                });
            }
        }
    }, [isLoading])


    const onLogoutHandler=async () => {
        logoutUser();
    }
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
                <Container maxWidth='lg'>
                    <Toolbar>
                        <Typography variant="h5" sx={{ cursor: "pointer",color:'#222' , fontWeight:700}} onClick={() => navigate('/')}>
                            SNVA Technologies
                        </Typography>

                        <Box display='flex' sx={{ml:'auto'}}>
                            {!user && ('WORK FOR USER Login & Register')}
                            { user && (<LoadingButton onClick={onLogoutHandler}>Logout</LoadingButton>)}
                        </Box>
                    </Toolbar>
                </Container>

            </AppBar>
        </>
    )
}

export default Header
import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"


const Footer = () => {
    return (
        <>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                sx={
                    {
                        backgroundColor: "#fff",
                        height: '4rem'
                    }
                }>
                                   SNVA Copyright @ 2023 
            </Box>
        </>
    )
}

export default Footer
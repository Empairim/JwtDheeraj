import { Box, Container, Typography } from "@mui/material"
import { useAppSelector } from "../redux/store"

const ProfilePage=()=>{

  const user= useAppSelector((state)=>state.userState.user)
  // retrive the user instance form the stroe or redux
  return(
    <Container>
        <Box>
          <Typography> Here is my profile</Typography>
        </Box>
        <Box sx={{mt:3}}>
          <Typography><strong>Id:</strong> {user?.id}</Typography>
          <Typography><strong>Full Name:</strong> {user?.name}</Typography>
          <Typography><strong>Email:</strong> {user?.email}</Typography>
          <Typography><strong>Profile Picture:</strong> {user?.photo}</Typography> 

          This is profile 
        </Box>
    </Container>
  )
    //const user // get it from store 
    // How to do that 

  ///  const user = 
}

export default ProfilePage
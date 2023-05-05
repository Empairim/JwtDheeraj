import { Box, Container, Typography } from "@mui/material";

const Unauthorized = () => {
  

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ece9e9",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography> Un Authorised access deteced</Typography>
      </Box>
    </Container>
  );
};

export default Unauthorized;

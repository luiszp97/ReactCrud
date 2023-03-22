import { CircularProgress, Grid } from "@mui/material"

export const LoadingPage = () => {
  return (
    <Grid container
        spacing= {0}
        direction="column"
        alignItems = "center"
        justifyContent = "center"
        sx={ { 
            minHeight : '100vh', 
            backgroundColor: '#90a4ae', 
            padding: 4}}
    >
      <CircularProgress sx={{fontSize:'20px'}} color="primary"/>
    </Grid>
    
  )
}

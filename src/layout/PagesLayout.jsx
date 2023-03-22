import { Grid, Typography } from "@mui/material"

export const PagesLayout = ( {children} ) => {
  return (
    <Grid container
        spacing= {0}
        direction="column"
        alignItems = "center"
        sx={ { 
            minHeight : '100vh', 
            backgroundColor: '#eceff1', 
            padding:"0 4px 4px 4px"
        }}
    >

    <Grid item
        className = 'box-shadow'
        mt={"80px"}
        // xs = { 10 }
        sx = {{
            width: {sm: "90%", sx:"85%", md: "90%"},
            backgroundColor: '#eceff1', 
            padding : 3, 
            borderRadius: 2}}
    >

    <Typography variant="h3" textAlign="center" color='black' fontWeight={'bold'} sx={{mb:2}}>React Notes</Typography>

        {children}

    </Grid>

</Grid>
  )
}
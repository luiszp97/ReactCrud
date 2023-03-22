import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle, Box, Fab, Grid } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

import { NavBar } from "../Components/NavBar"
import { NoteCard } from "../Components/NoteCard"
import { PagesLayout } from "../layout/PagesLayout"
import { changeSaved, isSincronized, openModal } from "../store/notes";
import { PopUpModal } from "../Components/PopUpModal";
import { useDb } from "../hooks/useDb";
import { UpdateDeleteModal } from "../Components/UpdateDeleteModal";

export const HomePage = () => {

  const [notes, setNotes] = useState(null);
  const { sincronized, isSaved } = useSelector(state => state.notes)

  const dispatch = useDispatch();

  const handleClick = () => {

    dispatch( openModal() )

  }

  const apiData = async () =>{

    const {data} = await useDb('notes');
    setNotes(data)

    dispatch( isSincronized() )

  }

  useEffect(() => {
  
    apiData()

  }, [sincronized]);

  useEffect(() => {
  
    setTimeout(() => {
      
      dispatch( changeSaved({ok:false, message: null}) )
  
    }, 1500);
    
  }, [isSaved.ok])

  

  return (
    <>
      <NavBar/>
        <PagesLayout>
            <Grid container gap={2}>
              
            {notes!== null && 
              notes.map( element => (
               <Grid item xs={5.8} key={element.id} >
                <NoteCard importance={element.importance} data = {element}/>
              </Grid>
            ) )}
            

              <Fab color="primary" aria-label="add"  onClick={ handleClick } sx={{position:"fixed", bottom:'50px', right:'50px'}}>
                <AddIcon />
              </Fab>
            </Grid>

            <PopUpModal/>
            <UpdateDeleteModal/>
             <Box width={300} position= 'fixed' sx={{top:'80px', right:'30px', display:`${ isSaved.ok ? "block" : 'none' }`}}>
              <Alert sx={{backgroundColor: `${ !isSaved ? '#e64a19' :' #76ff03'}`, borderRadius:'10px' }}>
                  <AlertTitle>Exito!</AlertTitle>
                    <strong>Tu nota se guardo exitosamente!</strong>
                </Alert>
             </Box>


        </PagesLayout>
    </>
  )
}
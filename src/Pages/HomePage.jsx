import { useDispatch, useSelector } from "react-redux";
import { Fab, Grid } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

import { NavBar } from "../Components/NavBar"
import { NoteCard } from "../Components/NoteCard"
import { PagesLayout } from "../layout/PagesLayout"
import { isSincronized, openModal } from "../store/auth/authSlice";
import { PopUpModal } from "../Components/PopUpModal";
import { useEffect, useState } from "react";
import { useDb } from "../hooks/useDb";
import { LoadingPage } from "./LoadingPage";

export const HomePage = () => {

  const [notes, setNotes] = useState(null);
  const { sincronized } = useSelector(state => state.auth)

  const dispatch = useDispatch();

  const handleClick = () => {

    dispatch( openModal() )

  }

  const apiData = async () =>{

    const data = await useDb('notes');
    setNotes(data)
    dispatch( isSincronized() )

  }

  useEffect(() => {
  
    apiData()
    
  }, [sincronized])

  return (
    <>
      <NavBar/>
        <PagesLayout>
            <Grid container gap={2}>
              
            {notes!== null && 
              notes.reverse().map( element => (
               <Grid item xs={5.8} key={element.id} >
                <NoteCard importance={element.importance} data = {element}/>
              </Grid>
            ) )}
            

              <Fab color="primary" aria-label="add"  onClick={ handleClick } sx={{position:"fixed", bottom:'50px', right:'50px'}}>
                <AddIcon />
              </Fab>
            </Grid>

            <PopUpModal/>


        </PagesLayout>
    </>
  )
}
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Alert, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { changeLoading, closeUpdateDeleteModal, desincronized, setActiveNote } from '../store/notes';
import { startDeletePost,  startUpdateNote } from '../store/notes';
import { useDb } from '../hooks/useDb';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'10px'
};

export const UpdateDeleteModal = () => {

   
  const { user: {displayName, id: userId} } = useSelector(state => state.auth);
  const { openUptadeDeleteModal, activeNote, loading } = useSelector( state => state.notes );
  
  const [title, setTitle] = useState("");
  const [importance, setImportance] = useState("");
  const [content, setContent] = useState("");


  const dispatch = useDispatch();
  const { register, handleSubmit, formState:{errors}, watch  } = useForm();

  const handleClose = () => {

    dispatch( closeUpdateDeleteModal() );
    dispatch( setActiveNote(null) );

    
  }

  useEffect(() => {
    
    if(activeNote !== null){

      setTitle(activeNote.title)
      setImportance(activeNote.importance)
      setContent(activeNote.content)

    }

  }, [openUptadeDeleteModal])
  

  const onSumit = async ({title, content, importance}) => {

    dispatch( changeLoading( true ) );

    const noteUpdated = {...activeNote, title, content, importance};
    
    dispatch( startUpdateNote( noteUpdated, activeNote.id ) )
   
  }

  const handleDelete = async () =>{
    
    const {data : notes} = await useDb('notes');
    const existingNote = notes.some(element => element.id === activeNote.id);

    dispatch( changeLoading( true ) )

    if(existingNote){

      dispatch( startDeletePost( activeNote.id, activeNote.userId ) )

    }else{

      dispatch( desincronized() )
      console.log('la Nota no existe en db')
    }
  }

  return (
    <div>
      <Modal
        open={openUptadeDeleteModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign='center'>
            Edita tu Nota
          </Typography>

          <form onSubmit={ handleSubmit( onSumit ) }>

            <Grid container>

              <Grid item xs = {12} sx = {{mt: 2}}>

                <TextField
                  label = "Title"
                  type="text"
                  placeholder= "Ponle un titulo a tu nota"
                  fullWidth
                  value={ activeNote !== null ? title : "title"}
                  autoComplete = 'off'
                  {...register('title', {required:true, minLength: 4, onChange: (e)=> setTitle(e.target.value)})}
                />
                
                {errors.email?.type === "minLength" && <Alert severity = 'error' sx={{mt:1}}>Introduce un titulo valido</Alert> }

              </Grid>
              <Grid item xs = {12} sx = {{mt: 2}}>
                <InputLabel >Importance</InputLabel>
                <Select
                  fullWidth
                  value={ activeNote !== null ? importance : "low"}
                  {...register('importance', { onChange:(e)=> setImportance(e.target.value) })}
                >
                  <MenuItem value = "higth" >Higth</MenuItem>
                  <MenuItem value = "medium">Medium</MenuItem>
                  <MenuItem value = "low" >Low</MenuItem>
                </Select>

              </Grid>
              <Grid item xs = {12} sx = {{mt: 2}}>

                <TextField
                  label = "Content"
                  type="text"
                  placeholder= "Escribe lo que piensas"
                  fullWidth
                  multiline
                  minRows={6}
                  maxRows={10}
                  value={ activeNote !== null ? content : "content"}
                  {...register('content', {required:true, minLength: 4, maxLength: 500, onChange: (e)=> setContent(e.target.value)})}
                />

                {errors.content?.type === "maxLength" && <Alert severity = 'error' sx={{mt:1}}>Lo sentimos no puedes exceder los 500 caracteres </Alert> }

              </Grid>
              
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>

            <Grid item xs={12} >

              <Button 
                sx ={{backgroundColor: '#4caf50', marginBottom:'5px', marginTop:'5px', ":hover": {backgroundColor: "#2e7d32"}}}
                type = 'submit' 
                variant = 'contained' 
                fullWidth 
                disabled = { loading }
              
              >
                  Actualizar Nota
              </Button>
              <Button 
                sx ={{backgroundColor: '#d32f2f', ":hover": {backgroundColor: "#b71c1c"}}}
                variant = 'contained' 
                type='button'
                fullWidth 
                onClick={ handleDelete }
                disabled = { loading }
                
              >
                 Borrar Nota
              </Button>


            </Grid>

            </Grid>

          
          </form>
        </Box>
      </Modal>
    </div>
  );
}
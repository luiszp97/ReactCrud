import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, setActiveNote } from '../store/auth/authSlice';
import { Alert, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { startSaveNewNote } from '../store/auth/thunks';
import { useEffect, useState } from 'react';
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

export const PopUpModal = () => {

  
  const { openModal, user: {displayName, id: userId}, activeNote, deleteNote } = useSelector(state => state.auth);

  const [isActiveNote, setIsActiveNote] = useState(false);

  const [title, setTitle] = useState("title")
  const [importance, setImportance] = useState(null)
  const [content, setContent] = useState(null)
  
  const dispatch = useDispatch()
  const { register, handleSubmit, formState:{errors}, watch  } = useForm();

  const handleClose = () => {

    dispatch( closeModal() )
    dispatch( setActiveNote(null) )

    setIsActiveNote(false)

    setTitle(null);
    setImportance(null);
    setContent(null);
    
  }

 

  useEffect(() => {

    if(activeNote !== null){

      setIsActiveNote(true)
      setTitle(activeNote.title)
      setImportance(activeNote.importance)
      setContent(activeNote.content)

    } else {
      setIsActiveNote(false)
      setTitle(null);
      setImportance(null);
      setContent(null);
    }


  }, [activeNote])
  


  const onSumit = async ({title, content, importance}) => {

    const post = await useDb("notes")
    
    if(activeNote !== null && post.some(element => element.id === activeNote.id)){
      if(deleteNote){
        console.log('delete')
      } else {
        console.log("update")
      }
    } else {
      console.log('new')
    }

    // dispatch( startSaveNewNote( {displayName, userId, title, content, importance} ) )

  }

  const updateNote = ()=> {
    
  }
  

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign='center'>
            Tu Nota
          </Typography>

          <form onSubmit={ handleSubmit( onSumit ) }>

            <Grid container>

              <Grid item xs = {12} sx = {{mt: 2}}>

                <TextField
                  label = "Title"
                  type="text"
                  placeholder= "Ponle un titulo a tu nota"
                  fullWidth
                  value={ title }  
                  {...register('title', {required:true, minLength: 4, onChange: (e)=> setTitle(e.target.value)})}
                />
                
                {errors.email?.type === "minLength" && <Alert severity = 'error' sx={{mt:1}}>Introduce un titulo valido</Alert> }

              </Grid>
              <Grid item xs = {12} sx = {{mt: 2}}>
                <InputLabel >Importance</InputLabel>
                <Select
                  fullWidth
                  defaultValue='low'
                  value={ importance }
                  {...register('importance', {onChange: (e)=> setImportance(e.target.value)})}
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
                  value={ content}
                  {...register('content', {required:true, minLength: 4, maxLength: 500, onChange: (e)=> setContent(e.target.value)})}
                />

                {errors.content?.type === "maxLength" && <Alert severity = 'error' sx={{mt:1}}>Lo sentimos no puedes exceder los 500 caracteres </Alert> }

              </Grid>
              
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>

            <Grid item xs={12} >

              <Button

                sx ={{backgroundColor: 'secundary.main', display:`${ isActiveNote ? 'none' : "block" }`}}
                type = 'submit' 
                variant = 'contained' 
                fullWidth 
              >
                  Guardar Nota
              </Button>
              <Button 
                sx ={{display:`${ !isActiveNote ? 'none' : "block" }`, backgroundColor: '#4caf50', marginBottom:'5px', marginTop:'5px', ":hover": {backgroundColor: "#2e7d32"}}}
                type = 'submit' 
                variant = 'contained' 
                fullWidth 
              
              >
                  Actualizar Nota
              </Button>
              <Button 
                sx ={{display:`${ !isActiveNote ? 'none' : "block" }`,backgroundColor: '#d32f2f', ":hover": {backgroundColor: "#b71c1c"}}}
                type = 'submit' 
                variant = 'contained' 
                fullWidth 
                
              
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
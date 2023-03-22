import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/auth/authSlice';
import { Alert, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { startSaveNewNote } from '../store/auth/thunks';

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

  const { openModal, user: {displayName, id: userId} } = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const { register, handleSubmit, formState:{errors} } = useForm();

  const handleClose = () => {

    dispatch( closeModal() )
    
  }

  const onSumit = ({title, content, importance}) => {

    const id =  Date.now().toString(36) + Math.random().toString(36).substring(2)
    dispatch( startSaveNewNote( {displayName, userId, id, title, content, importance} ) )

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
                  {...register('title', {required:true, minLength: 4})}
                />
                
                {errors.email?.type === "minLength" && <Alert severity = 'error' sx={{mt:1}}>Introduce un titulo valido</Alert> }

              </Grid>
              <Grid item xs = {12} sx = {{mt: 2}}>
                <InputLabel id="demo-simple-select-label">Importance</InputLabel>
                <Select
                  fullWidth
                  {...register('importance')}
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
                  {...register('content', {required:true, minLength: 4, maxLength: 500})}
                />

                {errors.content?.type === "maxLength" && <Alert severity = 'error' sx={{mt:1}}>Lo sentimos no puedes exceder los 500 caracteres </Alert> }

              </Grid>
              
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>

            <Grid item xs={12} >

              <Button 
                sx ={{backgroundColor: 'secundary.main'}}
                type = 'submit' 
                variant = 'contained' 
                fullWidth 
              
              >
                  Guardar Nota
              </Button>

            </Grid>

            </Grid>

          
          </form>
        </Box>
      </Modal>
    </div>
  );
}
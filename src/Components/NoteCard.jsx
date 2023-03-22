import { Box, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, setActiveNote } from '../store/auth';



export const NoteCard = ({importance, data}) => {

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

    const greenBg = "#a5d6a7"
    const redBg = "#ff9e80"

    let color;

    if(importance === "higth"){
        color = redBg;
    } else if (importance === "medium"){
        color = greenBg;
    } 

    const handleClick = () => {

        dispatch( setActiveNote( data ) )
        dispatch( openModal() )

    }

  return (
    <Card  sx={{backgroundColor:`${color}`, borderRadius:"0 15px 15px 15px", border: '2px solid black' }} >
      <CardContent>
        <Typography variant="h5" fontWeight='bold' component="div">
          {data.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.displayName}
        </Typography>
        <Typography variant="body2">
          {data.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Box onClick={ handleClick } display={data.userId === user.id ? 'block' : 'none'} >
          <IconButton sx={{ ':hover':{borderRadius:'0'}, width:{} }}>
            <SettingsIcon/>
              <Typography>Edit your note</Typography>
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}
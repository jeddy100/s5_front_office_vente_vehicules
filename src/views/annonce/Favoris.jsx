// src/components/CarList.js
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  CardActions,
  IconButton,
  Collapse,
  Avatar,
  CardHeader,
  CardActionArea,
  capitalize,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, Paper, Breadcrumbs, Link
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import {IconClipboardHeart, IconHeart, IconHeartOff, IconHeartPlus, IconHome, IconInfoCircle} from '@tabler/icons';
import { red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import config from '../../config';
import axios from 'axios';
import DetailAnnonce from './DetailAnnonce';
import StatutsAnnonce from '../../ui-component/annonce/StatutsAnnonce';
import AnnonceTemplate from "./AnnonceTemplate";
import MessageComponent from "../Chat/MessageComponent";
import HomeIcon from "@mui/icons-material/Home";

const Annonce = () => {
  const theme = useTheme();
  const link = `${config.http}://${config.host}`;
  const [user,setUser]=useState({})
  const [open, setOpen] = useState(false); // Add this line
  const [annonces, setAnnonces] = useState([]);



  useEffect(() => {
    const fetchuser= async ()=>{

      if(localStorage.getItem("simpleUserCarSell")!=null){
        setUser(await JSON.parse(localStorage.getItem("simpleUserCarSell")))
      }
    }
    fetchuser()
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if(localStorage.getItem("simpleUserCarSell")!==null){
        const response = await axios.get(link + `/favori/${user.userId}`);
        setAnnonces(response.data.donnee);
      }

    };
    fetchData();
  }, [user]);
  const handleDetails = () => {
    console.log('lol');
  };
  const getFirstLetterFromName = (nom) => {
    return capitalize(nom.charAt(0));
  };

  function handleFavoriteClick(id) {
    console.log(id);
  }

  // manokatra modals
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);

  const handleOpenModal = (annonce) => {
    setSelectedAnnonce(annonce);
  };

  const handleCloseModal = () => {
    setSelectedAnnonce(null);
  };

  // add to favorites


  return (
    <>

      {/*bread crumb */}
      <Paper elevation={0} sx={{ padding:3 , marginX:'1.4%' }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography variant="h3" sx={{ color: theme.palette.grey.A600 }}>Favoris</Typography>
          </Grid>
          <Grid item xs={2} alignItems={"end"}>
            <Breadcrumbs aria-label="breadcrumb" >
              <Link href="/" sx={{ display: 'flex', alignItems: 'center', color:theme.palette.grey.A600 }}>
                <IconHome sx={{ width: 20, height: 20, mr: 0.5 }} color={theme.palette.grey.A600}  />
              </Link>
              <Typography variant="subtitle1" sx={{ color: theme.palette.grey.A500 }}>favoris</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Paper>
      {/*dialog*/}
      <Dialog open={open} onClose={handleCloseModal} maxWidth="lg"  fullWidth>
        <DialogContent>
          <DetailAnnonce annonce={selectedAnnonce}></DetailAnnonce>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
      {/*end dialog*/}

      <Grid container spacing={4}>
        {annonces?.map((cars, index) => (

            <Grid item sm={4} key={index}>
              <AnnonceTemplate annonce={cars} user={user} link={link} showButton={true} />
            </Grid>

        ))}
      </Grid>
    </>
  );
};

export default Annonce;

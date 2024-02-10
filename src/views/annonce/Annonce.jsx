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
  // ty zavatra ty no creer-nao amze page ampiasainao
  const [user,setUser]=useState({})
  const [image, setImage] = useState('/images/1-porsche-911-gt3-2021-rt-hero-front.jpg');
  const [open, setOpen] = useState(false); // Add this line
  const [fav,setFav]=useState(0)
  const [searching,setSearchin]=useState("")

  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(link + '/annonce/getAnnoncesValidees');
      setAnnonces(response.data.donnee);
    };
    fetchData();
  }, [fav]);


  // de avy eo asina an'ty => maka an'le user
  useEffect(() => {
    const fetchuser=()=>{

      if(localStorage.getItem("simpleUserCarSell")!=null){
        setUser(JSON.parse(localStorage.getItem("simpleUserCarSell")))
      }
    }
    fetchuser()
  }, []);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = (urlParams.get('search'));
    console.log('User ID:', search);
    setSearchin(search)
  },[]);

  useEffect(() => {
    const getSearchResult=async ()=>{
      if(searching!==""){
        const response= await axios.get(link+`/simpleSearch/${searching}`)
        setAnnonces(response.data.donnee);
      }

    }
    getSearchResult()
  }, [searching]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = JSON.parse(urlParams.get('searchMulti'));
    console.log('searchMulti:',(search));

    if(urlParams.get('searchMulti')!==""){
      const getSearchResult = async (search) => {
        if (search !== null) {
          const response = await axios.post(link + `/form_recherche_multicritere`, search)
          setAnnonces(response.data.donnee);
        }
      }
      getSearchResult(search)
    }
  },[]);

  const handleDetails = () => {
    console.log('lol');
  };


  // manokatra modals
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);


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
            <Typography variant="h3" sx={{ color: theme.palette.grey.A600 }}>Annonces</Typography>
          </Grid>
          <Grid item xs={2} alignItems={"end"}>
            <Breadcrumbs aria-label="breadcrumb" >
              <Link href="/" sx={{ display: 'flex', alignItems: 'center', color:theme.palette.grey.A600 }}>
                <IconHome sx={{ width: 20, height: 20, mr: 0.5 }} color={theme.palette.grey.A600}  />
              </Link>
              <Typography variant="subtitle1" sx={{ color: theme.palette.grey.A500 }}>annonces</Typography>
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

            <Grid item sm={localStorage.getItem("simpleUserCarSell")?4:3} key={index}>
              <AnnonceTemplate annonce={cars} user={user} link={link} fav={fav} showButton={true}/>
            </Grid>

        ))}
      </Grid>
    </>
  );
};

export default Annonce;

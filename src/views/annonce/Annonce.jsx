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

    const getSearchResult=async (search)=>{
              const response= await axios.get(link+`/simpleSearch/${search}`)
      setAnnonces(response.data.donnee);
    }
    getSearchResult(search)
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

            <Grid item sm={4} key={index}>
              <AnnonceTemplate annonce={cars} user={user} link={link} fav={fav}/>
            </Grid>

          // <Card
          //   key={index}
          //   sx={{ position: 'relative', maxWidth: { xs: '100%', sm: '30%' }, bgcolor: '#ffffff', margin: '2%' }}
          //   m={5}
          //   elevation={1}
          // >
          //   <div id="user" style={{ display: 'flex', padding: '5px', marginTop: '5px', position: 'relative' }}>
          //     <Avatar
          //       sx={{
          //         bgcolor: theme.palette.secondary.light,
          //         color: theme.palette.secondary.main,
          //         fontSize: '1rem',
          //         width: '30px',
          //         height: '30px'
          //       }}
          //       aria-label="recipe"
          //     >
          //       {getFirstLetterFromName(cars.utilisateur.prenom)}
          //     </Avatar>
          //     <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '16px', width: '100%' }}>
          //       <Typography variant="subtitle1" component="div">
          //         {cars.utilisateur.prenom}
          //       </Typography>
          //       <Typography variant="subtitle2" color="text.secondary">
          //         {cars.date_annonce}
          //       </Typography>
          //     </div>
          //   </div>
          //
          //   <div style={{ position: 'relative' }}>
          //     {/* Image */}
          //     <CardActionArea>
          //       <CardMedia component="img" image={require(`../../assets${image}`)} alt="image vehicule" />
          //     </CardActionArea>
          //
          //     {/* Heart icon */}
          //     <IconButton
          //       aria-label="add to favorites"
          //       title="ajouter aux favoris"
          //       style={{
          //         position: 'absolute',
          //         bottom: 0,
          //         left: 0,
          //         color: cars.inFavorites ? '#fff' : '#fff',
          //         // backgroundColor: cars.inFavorites ? '#fff' : 'none', // Ajoutez cette ligne pour définir la couleur de fond sur blanc
          //         borderRadius: '50%',
          //         fontWeight: 'bolder'
          //       }}
          //       onClick={() => handleFavoriteClick(cars.id_annonce)} // Replace with your click handling function
          //     >
          //       <IconHeart
          //         enableBackground="new 0 0 24 24"
          //         style={{
          //           width: 25,
          //           height: 25,
          //           // backgroundColor:'red',
          //           borderRadius: 300,
          //           strokeWidth: 2,
          //           fill: cars.inFavorites ? '#fff' : 'none'
          //         }}
          //       />
          //       <span style={{ fontSize: 12 }}>9</span>
          //     </IconButton>
          //     <IconButton
          //       aria-label="add to favorites"
          //       title="ajouter aux favoris"
          //       style={{
          //         position: 'absolute',
          //         bottom: 10,
          //         right: '10%'
          //       }}
          //     >
          //       <StatutsAnnonce
          //         etat={cars.etat}
          //         style={{
          //           marginRight: '10%',
          //           marginBottom: '20%',
          //           left: 100
          //         }}
          //       ></StatutsAnnonce>
          //     </IconButton>
          //     <IconButton
          //       style={{
          //         position: 'absolute',
          //         bottom: '82%',
          //         color: '#fff',
          //         left: '88%'
          //       }}
          //       // onClick={handleOpenModal(cars.id_annonce)}
          //     >
          //       <IconInfoCircle></IconInfoCircle>
          //     </IconButton>
          //   </div>
          //
          //   <CardContent margin>
          //     <Grid container spacing={2}>
          //       <Grid item xs={8}>
          //         <Typography fontSize={'20px'} color={theme.palette.grey['900']} align="left">
          //           {cars.vehicule.modele.marque.nom_marque} , {cars.vehicule.modele.nom_modele} , {cars.vehicule.annee_fabrication}
          //         </Typography>
          //       </Grid>
          //       <Grid item xs={4}>
          //         <Typography fontSize={'18px'} color={theme.palette.primary.main} align="right">
          //           {cars.prixVehiculeAvecCommission} Ar
          //         </Typography>
          //       </Grid>
          //     </Grid>
          //   </CardContent>
          // </Card>
        ))}
      </Grid>
    </>
  );
};

export default Annonce;

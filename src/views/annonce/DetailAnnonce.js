import {
  Badge, Breadcrumbs,
  Button,
  capitalize,
  Card, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar, Link,
  Paper,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import annonce from './Annonce';
import {
  IconHome,
  IconMessage,
  IconMessage2,
  IconMessageCircle,
  IconMessageCircle2,
  IconPhoneCall,
  IconShoppingCart
} from '@tabler/icons';
import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config";

const DetailAnnonce = () => {
  const [idAnnonce, setIdAnnonce] = useState('');
  const image = require('../../assets/images/Car Sell-2.png')
  const [annonce,setAnnonce]=useState({})
  const [urlsImage,setImageUrl]=useState([image])
  const link = `${config.http}://${config.host}`;
  const [imgdef,setImgDef]=useState(0)
  const [i,setI] =useState()

  // obtenir l'annonce à partir de l'url
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idAnnonceParam = params.get('idAnnonce');
    setIdAnnonce(idAnnonceParam);
  }, []);

  useEffect(() => {
    const getAnnonce=async ()=>{
      if(idAnnonce!=""){
        const response = await axios.get(link+"/annonce/getAnnonceById/"+idAnnonce)
        if(response.status===200 && response.data.donnee){
          setAnnonce(response.data.donnee.annonce)
          if(response.data.donnee.imageUrl.length>0){
            setImageUrl(response.data.donnee.imageUrl)
            setImgDef(1)

          }
        }
      }

    }
    getAnnonce()
  }
  , [idAnnonce]);
  console.log(JSON.stringify(annonce))

  console.log("houlala : "+idAnnonce)
  const theme = useTheme();
  const annonce2 = {
    id_annonce: 'ANNONCE2',
    utilisateur: {
      id_user: 'USR2',
      nom: 'ravo',
      prenom: 'hary',
      date_naissance: '2002-01-19',
      email: 'ravohary@gmail.com',
      phone: '0345678990',
      password: '12345',
      enabled: true
    },
    vehicule: {
      id_vehicule: 'V2',
      immatricule: 'XYZ456',
      annee_fabrication: 2020,
      kilometrage_vehicule: 8000.0,
      nombre_sieges: 7,
      masse_vehicule: 1500.0,
      boite: {
        id_boite: 'B2',
        nom_boite: 'Boite manuelle'
      },
      carburant: {
        id_carburant: 'C2',
        nom_carburant: 'Diesel'
      },
      categorie: {
        id_categorie: 'CAT2',
        nom_categorie: 'Berline'
      },
      couleur: {
        id_couleur: 'COU2',
        nom_couleur: 'Rouge'
      },
      modele: {
        id_modele: 'MOD2',
        nom_modele: 'Civic',
        marque: {
          id_marque: 'M2',
          nom_marque: 'Honda'
        }
      },
      moteur: {
        id_moteur: 'MT2',
        nom_moteur: 'Diesel 2.0L',
        puissance: 180.0
      },
      pays: {
        id_pays: 'P2',
        nom_pays: 'Allemagne'
      }
    },
    date_annonce: '2024-01-19T16:47:18',
    prix: 324323.0,
    etat: 10,
    commission: 0.0,
    description: "description de l'annonce 2",
    prefixes: 'ANN',
    inFavorites: false,
    totalCommission: 0.0,
    sequenceName: 'annonce_seq',
    prixVehiculeAvecCommission: 324323.0
  };

  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      featured: true
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726'
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik'
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac'
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33'
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      featured: true
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta'
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman'
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex'
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls'
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster'
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs'
    }
  ];
  function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`
    };
  }
  return (
    // <Paper
    //   elevation={3}
    //   style={{
    //     padding: '3% 3% 3%',
    //     maxWidth: '100%',
    //     maxHeight: '700px',
    //     display: 'flex',
    //     margin: '2% auto',
    //     flexDirection: 'column',
    //     alignItems: 'center'
    //   }}
    // >
<>
  <Paper elevation={0} sx={{ padding:3 , marginX:'1.4%' }}>
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Typography variant="h3" sx={{ color: theme.palette.grey.A600 }}>Détails annonces</Typography>
      </Grid>
      <Grid item xs={4} alignItems={"end"}>
        <Breadcrumbs aria-label="breadcrumb" >
          <Link href="/" sx={{ display: 'flex', alignItems: 'center', color:theme.palette.grey.A600 }}>
            <IconHome sx={{ width: 20, height: 20, mr: 0.5 }} color={theme.palette.grey.A600}  />
          </Link>
          <Link href="/annonce" sx={{ display: 'flex', alignItems: 'center', color:theme.palette.grey.A600 }}>
          <Typography variant="subtitle1" sx={{ color: theme.palette.grey.A500 }}>annonces</Typography>
          </Link>

          <Typography variant="subtitle1" sx={{ color: theme.palette.grey.A500 }}>détails Annonce</Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  </Paper>

  <Grid container spacing={2} boxShadow={3} maxHeight={'50%'} style={{
    padding: '3% 3% 3%',
    maxWidth: '97%',
    maxHeight: '700px',
    display: 'flex',
    margin: '2% 1.8%',
    borderRadius:12,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'#fff'
  }}>
    <Grid item xs={5}>
      <Typography variant={'h3'} color={theme.palette.grey.A600}>
        Détails du véhicule
      </Typography>
      <ImageList sx={{
        width: '100%',
        height: '30%', }}
                 xs={{ width: '100%', height: 450 }} cols={1} rowHeight={450} style={{ borderRadius:12 , boxShadow:10 ,transform: 'translateZ(0)' }}>
        {urlsImage.map((item,index) => (
            <ImageListItem key={index} style={{
              borderBottom:'10px',

            }}>
              <img
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  alt={annonce?.vehicule?.modele?.marque.nom_marque}
                  loading="lazy"
                  style={{
                    // borderBottomColor :theme.palette.grey["400"],
                    transform: imgdef===0?'scaleY(-1) scaleX(-1)':'',
                    borderBottom:'1px', borderRadius:12 }}
              />
            </ImageListItem>
        ))}
      </ImageList>
    </Grid>

    <Grid item xs={12} sm={4} margin={0} >
      <div style={{ marginLeft: '4%' }}>
        <Typography variant={'h1'}>
          {annonce?.vehicule?.modele?.marque.nom_marque} , {annonce?.vehicule?.modele?.nom_modele} , {annonce?.vehicule?.annee_fabrication}
        </Typography>
        {/*description */}
        <div style={{ marginTop: '6%' }}>
          <Typography variant={'h3'} color={theme.palette.grey['500']}>
            Description :
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16}>
            {annonce?.description}
          </Typography>
        </div>

        <div style={{ marginTop: '6%' }}>
          <Typography variant={'h3'} color={theme.palette.grey['500']}>
            Détails du véhicule :
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '4%' }}>
            <span>Marque : </span> {annonce?.vehicule?.modele?.marque.nom_marque}
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '4%' }}>
            <span>Modèle : </span> {annonce?.vehicule?.modele?.nom_modele}
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '4%' }}>
            <span>immatricule : </span> {annonce?.vehicule?.immatricule}
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
            <span>année de fabrication : </span> {annonce?.vehicule?.annee_fabrication}
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
            <span style={{ color: theme.palette.grey['A900'] }}>nombre de sièges : </span> {annonce?.vehicule?.nombre_sieges}
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
            <span>poids : </span> {annonce?.vehicule?.masse_vehicule}
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
            <span>type de carburant : </span> {annonce?.vehicule?.carburant.nom_carburant}
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
            <span>catégorie : </span> {annonce?.vehicule?.categorie.nom_categorie}
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
            <span>moteur : </span> {annonce?.vehicule?.moteur.nom_moteur}
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
            <span>puissance du moteur : </span> {annonce?.vehicule?.moteur.puissance}
          </Typography>
        </div>
      </div>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Card elevation={1} style={{ padding: '10%' }}>
        <Typography variant={'h2'} style={{ margin: '10%' }} color={theme.palette.grey['700']} align={'center'}>
          Ar <span>{annonce?.prixVehiculeAvecCommission}</span>
        </Typography>
        {/*proprietaire*/}
        <div>
          <Typography variant={'h3'} color={theme.palette.grey['500']}>
            Propriétaire
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '4%' }}>
            Nom: {annonce?.utilisateur?.nom?capitalize(annonce.utilisateur.nom):""}
          </Typography>
          <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
            Prénom(s): {annonce?.utilisateur?.prenom?capitalize(annonce.utilisateur.prenom):""}
          </Typography>
          <Button
              variant={'contained'}
              fullWidth
              style={{ background: theme.palette.secondary.light, margin: '5% 0%', color: theme.palette.secondary.dark }}
          >
            <IconMessage2 style={{ marginRight: '2%' }}></IconMessage2> Contacter le propriétaire
          </Button>
          <Button
              variant={'contained'}
              fullWidth
              style={{ background: theme.palette.warning.dark, margin: '5% 0%', color: theme.palette.grey['900'] }}
          >
            <IconShoppingCart style={{ marginRight: '2%' }}></IconShoppingCart> Acheter
          </Button>
        </div>
      </Card>

    </Grid>
  </Grid>
</>

    // </Paper>
  );
};
export default DetailAnnonce;

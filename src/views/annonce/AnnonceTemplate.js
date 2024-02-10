import { Button, Card, CardContent, CardMedia, Grid, IconButton, Rating, Stack, Typography } from '@mui/material';
import {IconHeart, IconShoppingCart} from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import config from '../../config';
import axios from 'axios';
import {useNavigate} from "react-router";
import StatutsAnnonce from '../../ui-component/annonce/StatutsAnnonce';

const AnnonceTemplate = ({ annonce, user, link ,fav,showButton}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const image = require('../../assets/images/Car Sell-2.png');
  const [images, setImages] = useState([image]);
  const [imgdef, setImgDef] = useState(0);
  const handleBuy = () => {
    navigate(`/achatVehicule?idAnnonce=${annonce.id_annonce}`)
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(link + '/annonce/getimagesbyId/' + annonce.id_annonce);
        if (response.status === 200 && response.data.donnee.length !== 0) {
          setImages(response.data.donnee);
          setImgDef(1);
        }
      } catch (e) {
        console.log('tsisy sary');
      }
    };
    fetchData();
  }, []);

  const handleFavoriteClick = async (id) => {
    const response = await axios.post(link + `/favori/${user.userId}/${annonce.id_annonce}`);
    if(response.status===200){
        fav=(fav+1);
        window.location.reload();
    }
  };

  const refDetailImage = `/detailAnnonce?idAnnonce=${annonce.id_annonce}`;

  console.log(JSON.stringify(annonce))
  return (
    <Grid item xs={12} margin={3} >
      <Card elevation={0}  sx={{ borderRadius: '8px',boxShadow:0.5 }}>
        <div style={{ position: 'relative' }}>
          <CardMedia
            component="a"
            title="Contemplative Reptile"
            href={refDetailImage}
            image={images[0]}
            sx={{
              // backgroundColor:'red',
              // backgroundImage: "url('"+images[0]+"')",
              // backgroundSize: 'cover',
              // backgroundPosition: 'center',
              height: '250px',
              boxShadow: 1,
              transform: imgdef === 0 ? 'scaleY(-1) scaleX(-1)' : ''
            }}
          />
          {localStorage.getItem("simpleUserCarSell")!==null?
            <IconButton
              aria-label="add to favorites"
              title="ajouter aux favoris"
              style={{
                position: 'absolute',
                bottom: 5,
                left: 10,
                color: annonce.inFavorites === 1 ? theme.palette.secondary.light : theme.palette.secondary.light,
                backgroundColor: annonce.inFavorites ? theme.palette.secondary.dark : '#fff', // Ajoutez cette ligne pour définir la couleur de fond sur blanc
                borderRadius: '50%',
                fontWeight: 'bolder'
              }}
              onClick={() => handleFavoriteClick(annonce.id_annonce)} // Replace with your click handling function
            >
              <IconHeart
                enableBackground="new 0 0 24 24"
                style={{
                  width: 25,
                  height: 25,
                  // backgroundColor: 'red',
                  borderRadius: 300,
                  strokeWidth: 2,
                  fill: annonce.inFavorites === 1 ? '#fff' : 'none'
                }}
              />
              {/*<span style={{ fontSize: 12 }}> {annonce.nombreFavoris}</span>*/}
            </IconButton>:<></>
          }
        </div>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" component="a" href="/apps/e-commerce/product-details/7">
                {annonce.vehicule.modele.marque.nom_marque} , {annonce.vehicule.modele.nom_modele} , {annonce.vehicule.annee_fabrication}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {annonce.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center">
                <Typography variant="h6">Ar </Typography>
                <Typography variant="h4"> {annonce.prixVehiculeAvecCommission}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {/*{!showButton && <StatutsAnnonce etat={0}></StatutsAnnonce>}*/}
              {showButton && <Button
                variant={'contained'}
                fullWidth
                style={{ background: theme.palette.warning.dark, margin: '5% 0%', color: theme.palette.grey['900'] }}
                onClick={handleBuy}
              >
                <IconShoppingCart style={{ marginRight: '2%' }}></IconShoppingCart> Acheter
              </Button>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default AnnonceTemplate;

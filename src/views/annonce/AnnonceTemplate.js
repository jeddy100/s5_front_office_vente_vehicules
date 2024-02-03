import { Button, Card, CardContent, CardMedia, Grid, IconButton, Rating, Stack, Typography } from '@mui/material';
import { IconHeart } from '@tabler/icons';
import React from 'react';
import { useTheme } from '@mui/material/styles';

const AnnonceTemplate = ({ annonce }) => {
  const theme = useTheme();
  const handleFavoriteClick = (id) => {
    console.log(id);
  };
  return (
    <Grid item xs={12} margin={3}>
      <Card elevation={0} sx={{ borderRadius: '8px' }}>
        <div style={{ position: 'relative' }}>
          <CardMedia
            component="a"
            title="Contemplative Reptile"
            href="/detailAnnonce"
            sx={{
              backgroundImage: 'url("https://berrydashboard.io/assets/prod-7-4b3b092a.png")',
              height: '250px'
            }}
          />
          <IconButton
            aria-label="add to favorites"
            title="ajouter aux favoris"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              color: annonce.inFavorites === 1 ? '#fff' : '#fff',
              // backgroundColor: cars.inFavorites ? '#fff' : 'none', // Ajoutez cette ligne pour définir la couleur de fond sur blanc
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
            <span style={{ fontSize: 12 }}>9</span>
          </IconButton>
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
              <Button variant="contained" color="primary" size="medium" sx={{ width: '100%' }} aria-label="product add to cart">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.55 11 17.55 6H6.16l2.37 5z" opacity="0.3" fill="#fff"></path>
                  <path
                    d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
                    fill="#fff"
                  ></path>
                </svg>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default AnnonceTemplate;

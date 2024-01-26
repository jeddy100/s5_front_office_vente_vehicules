import {
  Badge,
  Button,
  capitalize,
  Card, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import annonce from './Annonce';
import { IconMessage, IconMessage2, IconMessageCircle, IconMessageCircle2, IconPhoneCall, IconShoppingCart } from '@tabler/icons';

const DetailAnnonce = ({id_annonce}) => {
  const theme = useTheme();
  const annonce = {
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
    <Paper
      elevation={3}
      style={{
        padding: '3% 3% 3%',
        maxWidth: '100%',
        maxHeight: '700px',
        display: 'flex',
        margin: '2% auto',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >

      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Typography variant={'h3'} color={theme.palette.grey.A600}>
            Détails du véhicule
          </Typography>
          <ImageList
            sx={{
              width: '100%',
              height: '30%',
              maxHeight:'30%',
              borderTopRightRadius: '4%',
              borderBottomLeftRadius: '4%',
              // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
              transform: 'translateZ(0)'
            }}
            rowHeight={200}
            gap={1}
          >
            {itemData.map((item) => {
              const cols = item.featured ? 2 : 1;
              const rows = item.featured ? 2 : 1;

              return (
                <ImageListItem key={item.img} cols={cols} rows={rows}>
                  <img {...srcset(item.img, 250, 200, rows, cols)} alt={item.title} loading="lazy" />
                </ImageListItem>
              );
            })}
          </ImageList>
        </Grid>

        <Grid item xs={12} sm={4} margin={0} >
          <div style={{ marginLeft: '4%' }}>
            <Typography variant={'h1'}>
              {annonce.vehicule.modele.marque.nom_marque} , {annonce.vehicule.modele.nom_modele} , {annonce.vehicule.annee_fabrication}
            </Typography>
            {/*description */}
            <div style={{ marginTop: '6%' }}>
              <Typography variant={'h3'} color={theme.palette.grey['500']}>
                Description :
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16}>
                {annonce.description}
              </Typography>
            </div>

            <div style={{ marginTop: '6%' }}>
              <Typography variant={'h3'} color={theme.palette.grey['500']}>
                Détails du véhicule :
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '4%' }}>
                <span>Marque : </span> {annonce.vehicule.modele.marque.nom_marque}
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '4%' }}>
                <span>Modèle : </span> {annonce.vehicule.modele.nom_modele}
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '4%' }}>
                <span>immatricule : </span> {annonce.vehicule.immatricule}
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
                <span>année de fabrication : </span> {annonce.vehicule.annee_fabrication}
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
                <span style={{ color: theme.palette.grey['A900'] }}>nombre de sièges : </span> {annonce.vehicule.nombre_sieges}
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
                <span>poids : </span> {annonce.vehicule.masse_vehicule}
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
                <span>type de carburant : </span> {annonce.vehicule.carburant.nom_carburant}
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
                <span>catégorie : </span> {annonce.vehicule.categorie.nom_categorie}
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
                <span>moteur : </span> {annonce.vehicule.moteur.nom_moteur}
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
                <span>puissance du moteur : </span> {annonce.vehicule.moteur.puissance}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card elevation={1} style={{ padding: '10%' }}>
            <Typography variant={'h2'} style={{ margin: '10%' }} color={theme.palette.grey['700']} align={'center'}>
              Ar <span>{annonce.prixVehiculeAvecCommission}</span>
            </Typography>
            {/*proprietaire*/}
            <div>
              <Typography variant={'h3'} color={theme.palette.grey['500']}>
                Propriétaire
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '4%' }}>
                Nom: {capitalize(annonce.utilisateur.nom)}
              </Typography>
              <Typography variant={'subtitle2'} fontSize={16} style={{ marginTop: '3%' }}>
                Prénom(s): {capitalize(annonce.utilisateur.prenom)}
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
    </Paper>
  );
};
export default DetailAnnonce;

import { Breadcrumbs, Button, Card, CardContent, Grid, Link, Paper, Typography } from '@mui/material';
import {IconCheck, IconCoins, IconHome, IconShoppingCart} from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import config from '../../config';
import {Alert} from "@mui/lab";
import {WarningTwoTone} from "@mui/icons-material";

const VenteAnnonce = () => {
  const theme = useTheme();
  const [idAnnonce, setIdAnnonce] = useState('');
  const [annonce, setAnnonce] = useState();
  const [formAnnonce, setFormAnnonce] = useState({});
  const link = `${config.http}://${config.host}`;
  const date = new Date();
  const [userToken, setUserToken] = useState({});
  const[erreurs,setErreurs]=useState("")
  const[success,setSuccess]=useState("")
  const [venteEffectue,setVenteEffectue]=useState(0)
  useEffect(() => {
    const getjson = async () => {
      console.log('leo ' + JSON.stringify(localStorage.getItem('simpleUserCarSell')));
      const token = await JSON.parse(localStorage.getItem('simpleUserCarSell'));
      setUserToken(token);
    };
    getjson();
  }, []);

  // obtenir les donnees venant du lien
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idAnnonceParam = params.get('idAnnonce');
    setIdAnnonce(idAnnonceParam);
  }, []);

  // obtenir l'annonce qui correspoond a l'id
  useEffect(() => {
    const getAnnonce = async () => {
      if (idAnnonce != '') {
        try {
          const response = await axios.get(link + '/annonce/getAnnonceById/' + idAnnonce);
          if (response.status === 200 && response.data.donnee) {
            setAnnonce(response.data.donnee.annonce);
            if (response.data.donnee.imageUrl.length > 0) {
              setImageUrl(response.data.donnee.imageUrl);
              setImgDef(1);
            }
          }
        } catch (e) {
          console.log('tsy hita le annonce');
        }
      }
    };
    getAnnonce();
  }, [idAnnonce]);
  // details de la vente

  useEffect(() => {
    setFormAnnonce({
      utilisateur:userToken.userId,
      annonce:annonce?.id_annonce
    })
  }, [annonce]);
  console.log("form"+JSON.stringify(formAnnonce))
  // payer une annonce
  const pay=async ()=>{
    try{

      const response= await axios.post(link+"/annonce/vendreVehicule",formAnnonce,
      )
      console.log(JSON.stringify(response.data))
      console.log()
      if(response.data.statut===200){
        setVenteEffectue(1)
        setSuccess()
        console.log("payed")
      }
      else if(response.data.statut===404){
        setVenteEffectue(-1)
        setErreurs(response.data.erreur)
        console.log("une erreur ")

      }
    }catch (e){
      console.log("erreur")
    }
  }
  console.log()
  console.log(">?"+localStorage.getItem("simpleUserCarSell"))

  return (
    <>
      <Paper elevation={0} sx={{ padding: 3, marginX: '1.4%' }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h3" sx={{ color: theme.palette.grey.A600 }}>
              Achat de véhicules
            </Typography>
          </Grid>
          <Grid item xs={4} alignItems={'end'}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/" sx={{ display: 'flex', alignItems: 'center', color: theme.palette.grey.A600 }}>
                <IconHome sx={{ width: 20, height: 20, mr: 0.5 }} color={theme.palette.grey.A600} />
              </Link>
              <Link href="/annonce" sx={{ display: 'flex', alignItems: 'center', color: theme.palette.grey.A600 }}>
                <Typography variant="subtitle1" sx={{ color: theme.palette.grey.A500 }}>
                  annonces
                </Typography>
              </Link>

              <Typography variant="subtitle1" sx={{ color: theme.palette.grey.A500 }}>
                Achat vehicules
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Paper>


      <Card
        container
        spacing={2}
        boxShadow={3}
        maxHeight={'50%'}
        style={{
          padding: '3% 3% 3%',
          maxWidth: '97%',
          maxHeight: '700px',
          display: 'flex',
          margin: '2% 1.8%',
          borderRadius: 12,
          flexDirection: 'column',
          alignItems: 'left',
          backgroundColor: '#fff'
        }}
      >
        <CardContent>
          <Grid sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
            <Typography variant={'h3'}>confirmation de la vente : </Typography>
            <Typography variant={'subtitle2'} marginLeft={80}>
              Date: {String(date.getDate())}-{date.getMonth()}-{date.getFullYear()}
            </Typography>
          </Grid>
          {venteEffectue===1?
              <Alert icon={<IconCheck fontSize="inherit" />} severity="success">
                Payement effectué
              </Alert>:<></>
          }{erreurs &&
            <Alert icon={<WarningTwoTone fontSize="inherit" />} style={{ marginLeft: '5%%',marginBottom:'3%'}} severity="error">
              {erreurs}
            </Alert>
        }
          <Grid sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
            <Typography>Vehicule : </Typography>
            <Typography style={{ marginLeft: '65%', fontSize: '16px' }}>
              {annonce?.vehicule?.modele?.marque.nom_marque} , {annonce?.vehicule?.modele?.nom_modele} ,{' '}
              {annonce?.vehicule?.annee_fabrication}
            </Typography>
          </Grid>

          <Grid sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
            <Typography>Propriétaire actuel du vehicule : </Typography>
            <Typography style={{ marginLeft: '51.5%', fontSize: '16px' }}>
              {annonce?.utilisateur?.nom} {annonce?.utilisateur?.prenom}
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
            <Typography>Montant à payer : </Typography>
            <Typography variant={'body1'} style={{ marginLeft: '60%', fontSize: '20px' }}>
              {annonce?.prixVehiculeAvecCommission} Ariary
            </Typography>
          </Grid>
        </CardContent>
        <Button
          variant={'contained'}
          fullWidth
          style={{ background: venteEffectue===1?theme.palette.success.dark:theme.palette.warning.dark, margin: '5% 0%', color: theme.palette.grey['900'] }}
          disabled={venteEffectue===1?true:false}
          onClick={pay}
        >
          {venteEffectue===1?<><IconCheck style={{ marginRight: '2%' }}></IconCheck> payé</>:<><IconCoins style={{ marginRight: '2%' }}></IconCoins> Payer</>}

        </Button>
      </Card>
    </>
  );
};
export default VenteAnnonce;

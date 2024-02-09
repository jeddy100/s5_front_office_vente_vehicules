import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Button, Card, CardContent, CardHeader, Chip, Divider, Grid, List, ListItem, ListItemText, Paper, Tab, Tabs, Typography } from '@mui/material';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import config from '../../config';
import AnnonceTemplate from '../annonce/AnnonceTemplate';

function ProfileContent() {
  const link = `${config.http}://${config.host}`;

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("simpleUserCarSell");
    return storedUser ? JSON.parse(storedUser) : {};
  });  const [utilisateur,setUtilisateur]=useState({})
  const [solde,setSolde]=useState({})


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(link + `/user/userByid/${user.userId}`);
        const userData = response.data.donnee;
        if (userData.utilisateur) {
          setUtilisateur(userData.utilisateur);
          localStorage.setItem("simpleUserCarSell", JSON.stringify(userData.utilisateur));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [link, user.userId]);



  //maka solde
  useEffect(() => {
    const fetchData = async () => {
      if(localStorage.getItem("simpleUserCarSell")){
        const response = await axios.get(link + `/getSoldeUtilisateur/${user.userId}`);
        console.log("box "+(JSON.stringify(response.data.donnee)))
          setSolde(response.data.donnee);

      }
    };
    fetchData();
  }, [link, user.userId]);

  // annonces par utitlisateur
  const [annonces, setAnnonces] = useState([]);
  const [fav,setFav]=useState(0)

  useEffect(() => {
    const fetchData = async () => {
      if(localStorage.getItem("simpleUserCarSell")) {
        try{
        const response = await axios.get(link + `/annonce/getannoncesbyIduser/${user.userId}`);
        console.log("box "+(JSON.stringify(response.data.donnee)))

        setAnnonces(response.data.donnee);
      }catch (e) {
        console.log(e)
        }
      }

    };
    fetchData();
  }, [fav,link, user.userId]);




  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <Paper elevation={1} className="MuiCard-root css-1exf29l" style={{ marginBottom: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        {/* Content for the first paper */}
      </Paper>
      <Paper elevation={1} className="MuiCard-root css-10lixas" style={{ marginTop: '5px', marginBottom: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Tabs value={0} aria-label="simple tabs example">
                <Tab label={<span><AccountCircleTwoToneIcon />Profile</span>}
                     href="/profile" />
                <Tab label={<span><ReceiptLongIcon />Transaction</span>}
                     href="/transaction" />

              </Tabs>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
      <Grid container spacing={3} style={{ marginTop: '5px' }}>
        <Grid item xs={12} lg={4}>
          <Card elevation={1} className="MuiCard-root css-10z62t2" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader title={utilisateur?.nom + " " + utilisateur?.prenom} subheader="" />
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText primary="Email" />
                  <Typography variant="subtitle2" align="right">{utilisateur?.email}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Phone" />
                  <Typography variant="subtitle2" align="right">{utilisateur?.phone}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Date de naissance " />
                  <Typography variant="subtitle2" align="right">{utilisateur?.dateNaissance}</Typography>
                </ListItem>
              </List>
              <CardContent>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant="h3" align="center">{solde?.solde}</Typography>
                    <Typography variant="subtitle2" align="center">Solde Arirary</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h3" align="center">2749</Typography>
                    <Typography variant="subtitle2" align="center">nombre d annonces</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h3" align="center">678</Typography>
                    <Typography variant="subtitle2" align="center">nombre de transactions</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={4}>
            {annonces?.map((cars, index) => (

              <Grid item sm={4} key={index}>
                <AnnonceTemplate annonce={cars} user={user} link={link} fav={fav}/>
              </Grid>

            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileContent;

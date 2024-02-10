import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid, IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import config from '../../config';
import AnnonceTemplate from '../annonce/AnnonceTemplate';
import { IconCoin, IconList, IconUser } from '@tabler/icons';
import StatutsAnnonce from '../../ui-component/annonce/StatutsAnnonce';

function ProfileContent() {
  const link = `${config.http}://${config.host}`;

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("simpleUserCarSell");
    return storedUser ? JSON.parse(storedUser) : {};
  });  const [utilisateur,setUtilisateur]=useState({})


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
    <div style={{  padding: '20px' }}>
      <Paper elevation={1} className="MuiCard-root css-1exf29l" style={{ marginBottom: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        {/* Content for the first paper */}
      </Paper>
      <Paper elevation={1} className="MuiCard-root css-10lixas" style={{ marginTop: '5px', marginBottom: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Tabs value={0} aria-label="simple tabs example">
                <Tab label={<><AccountCircleTwoToneIcon />Profile</>}
                     href="/profile" />
                <Tab label={<><ReceiptLongIcon />Transaction</>}
                     href="/transaction" />

              </Tabs>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
      <Grid container spacing={3} style={{ marginTop: '5px' }}>
        <Grid item xs={12} lg={4}>
          <Card elevation={1} className="MuiCard-root css-10z62t2" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader
              avatar={<IconUser/>}
              title={`${utilisateur?.nom} ${utilisateur?.prenom}`}
              subheader=""
            />
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText primary="Id" />
                  <Typography variant="subtitle2" align="right">{utilisateur?.userId}</Typography>
                </ListItem>
                <Divider />
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

            </CardContent>
            <CardContent>
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="h3" align="center">{annonces.length}</Typography>
                  <Typography variant="subtitle2" align="center">nombre d&apos;annonces</Typography>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={8}>

            <Card style={{minHeight:200}}>
              <CardHeader avatar={<IconList/>} title={"Listes de vos annonces"}>

              </CardHeader>
              <Divider />
              <CardContent>
                <Grid spacing={2} style={{ display: 'flex', alignItems: 'center' }}>
                  {annonces?.map((cars, index) => (

                    <Grid item xs={4} key={index}>
                      <StatutsAnnonce etat={cars.etat} style={{ top:20 , position: 'absolute' }} />
                      <AnnonceTemplate style={{ position: 'relative' }} annonce={cars} user={user} link={link} fav={fav} showButton={false} />
                    </Grid>
                  ))}
                </Grid>

                  </CardContent>

            </Card>

        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileContent;

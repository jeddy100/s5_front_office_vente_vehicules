import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  capitalize,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography
} from '@mui/material';

import axios from 'axios';
import config from '../../config';
import { useTheme } from '@mui/material/styles';
import MessageComponent from './MessageComponent';
import { IconSend } from '@tabler/icons';

import { IconHome, IconMenu, IconMessage } from '@tabler/icons';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { CallTwoTone, ErrorTwoTone, ExpandMore, MoreHorizTwoTone, VideoCallTwoTone } from '@mui/icons-material';
// import ChatMenu from './ChatMenu';

const ChatPrincipale = () => {
  // const colors=["",""]
  const [listUsers, setListUser] = useState([
    { nom: 'prisca', id: 1 },
    { nom: 'Jeddy', id: 2 },
    { nom: 'Jessy', id: 3 },
    { nom: 'Mendrika', id: 4 }
  ]);
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, setUserToken] = useState({});
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken.token}`
  };
  const [sentMessage, setSentMessage] = useState(0);
  const [messageRecepteur, setMessageRecepteur] = useState({});
  // utilisateur venant de l'url
  const [conversation, setConversation] = useState([]);

  const link = `${config.http}://${config.host}`;
  const theme = useTheme();


  useEffect(() => {
    const getjson = async () => {
      console.log('leo ' + JSON.stringify(localStorage.getItem('simpleUserCarSell')));
      const token = await JSON.parse(localStorage.getItem('simpleUserCarSell'));
      setUserToken(token);
    };
    getjson();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId=(urlParams.get('idUser')) ;
    console.log('User ID:', userId);
    const getUserById = async (userId) => {
      try {
        const resp = await axios.get(link + `/user/userByid/${userId}`);
        console.log(JSON.stringify(resp.data.donnee.utilisateur));
        setMessageRecepteur(resp.data.donnee.utilisateur)
        const postconversation = await axios.post(link + `/getConversation`, {
          idExpediteur: currentUser.userId,
          idRecepteur: messageRecepteur.userId
        });
        setConversation(postconversation.data.donnee);
      } catch (e) {
        console.log(e);
      }
    };
    getUserById(userId);
  }, []);

  useEffect(() => {
    const getCurrentuser = async () => {
      if (localStorage.getItem('simpleUserCarSell') !== null) {
        try {
          const response = await axios.get(link + `/user/userByid/${userToken.userId}`);
          if (response.data.donnee.utilisateur !== null) {
            setCurrentUser(response.data?.donnee?.utilisateur ? response.data.donnee.utilisateur : {});
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    getCurrentuser();
  }, [userToken]);

  useEffect(() => {
    const getDatas = async () => {
      const datas = await axios.get(link + `/getSerndersName/${currentUser.userId}`);

      setListUser(datas.data.donnee);
      if (messageRecepteur === {} && listUsers.length > 0) {
        setMessageRecepteur(listUsers[0]);
      }

      const postconversation = await axios.post(link + `/getConversation`, {
        idExpediteur: currentUser.userId,
        idRecepteur: messageRecepteur.userId
      });
      setConversation(postconversation.data.donnee);
    };
    getDatas();
  }, [currentUser, messageRecepteur, sentMessage]);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState({});

  // const handleChangeConversation = (user) => {
  //   setMessageRecepteur(user);
  // };
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setMessages({ contenuMesssage: e.target.value, idExpediteur: currentUser.userId, idRecepteur: messageRecepteur.userId });
  };
  const conversationRef = useRef(null);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversation?.messages]);



  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    try {
      if (messages.contenuMesssage !== '') {
        console.log(`Authorization: 'Bearer ' + ${userToken.token}`);
        console.log('messages ' + JSON.stringify(messages));
        const sendMessage = await axios.post(link + '/SendMessage', messages, {
          headers: {
            Authorization: 'Bearer ' + userToken.token
          }
        });
        console.log(sendMessage.data);
        setSentMessage(sentMessage + 1);
        setMessages({});
        // setInput('');
      }
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };
  const getFirstLetterFromName = (nom) => {
    return capitalize(nom.charAt(0));
  };

  const handleChangeConversation = (user) => {
    setMessageRecepteur(user);
    console.log('>>>>>>>' + user);
    console.log(JSON.stringify(listUsers));
  };

  console.log('see details ');
  console.log('current ' + JSON.stringify(currentUser));
  console.log('conv ' + JSON.stringify(messageRecepteur));

  return (
    <>
      {/*bread crumb */}
      <Paper elevation={0} sx={{ padding: 3, marginX: '1.4%' }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography variant="h3" sx={{ color: theme.palette.grey.A600 }}>
              Messagerie
            </Typography>
          </Grid>
          <Grid item xs={2} alignItems={'end'}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/" sx={{ display: 'flex', alignItems: 'center', color: theme.palette.grey.A600 }}>
                <IconHome sx={{ width: 20, height: 20, mr: 0.5 }} color={theme.palette.grey.A600} />
              </Link>
              <Typography variant="subtitle1" sx={{ color: theme.palette.grey.A500 }}>
                messagerie
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2} sx={{ padding: 3 }}>
        <Grid item xs={12} sm={4} m={0}>
          <Card elevation={3} style={{ maxWidth: '100%', margin: '2% auto', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', boxShadow: 1 }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.warning.light,
                  color: theme.palette.warning.dark,
                  fontSize: '1rem',
                  width: '40px',
                  height: '40px',
                  marginRight: '10px' // Ajout de marge à droite pour séparer l'avatar de la typographie
                }}
                aria-label="recipe"
              >
                {getFirstLetterFromName(currentUser.nom ? currentUser.nom : 'u')}
              </Avatar>
              <Typography variant="h4" align="left" width={100}>
                {currentUser.nom}
              </Typography>
            </CardContent>

            <Divider/>
            {listUsers?.map((userMessage, index) => (
              <CardActionArea
                key={index}
                style={{ marginBottom: '2%', paddingX: '2%' }}
                onClick={() => handleChangeConversation(userMessage)}
              >
                <CardContent
                  sx={{ display: 'flex', alignItems: 'center', paddingX: '2%', height: '50px', '&:hover': { backgroundColor: '#f4f8fd' } }}
                >
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.dark,
                      fontSize: '1rem',
                      width: '40px',
                      height: '40px',
                      marginRight: '10px' // Ajout de marge à droite pour séparer l'avatar de la typographie
                    }}
                    aria-label="recipe"
                  >
                    {getFirstLetterFromName(userMessage.nom ? userMessage.nom : '')}
                  </Avatar>
                  <Typography variant="body1" align="left">
                    {userMessage.nom}
                  </Typography>
                  <Divider />
                  <IconButton style={{ marginLeft: '60%', color: theme.palette.primary.dark }}>
                    <IconSend />
                  </IconButton>
                </CardContent>
              </CardActionArea>
            ))}
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} m={0}>
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              maxWidth: '100%',
              maxHeight: '700px',
              minHeight: '700px',
              margin: '1% auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Grid container className="css-14dekvw">
              <Grid item className="css-1wxaqej" style={{ marginX: '20%' }}>
                <Grid container spacing={2} className="css-qfscy">
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.secondary.light,
                      color: theme.palette.secondary.main,
                      fontSize: '1rem',
                      width: '35px',
                      marginTop: '8%',
                      marginX: '2%',
                      height: '35px'
                    }}
                    aria-label="recipe"
                  >
                    {getFirstLetterFromName(messageRecepteur.nom ? messageRecepteur.nom : '')}
                  </Avatar>
                  <Grid item xs={5} className="css-15j76c0">
                    <Grid container>
                      <Grid item xs={12} className="css-15j76c0">
                        <Typography variant="h4" className="css-1j5dgsv">
                          {messageRecepteur.nom}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div
              ref={conversationRef}
              style={{
                flexGrow: 1,
                overflowY: 'auto',
                width: '100%'
              }}
            >
              <List>
                {conversation?.messages?.map((message, index) => (
                  <ListItem
                    key={index}
                    alignItems="flex-start"
                    variant="rounded"
                    style={{
                      display: 'flex',
                      margin: '0%',
                      width: 'auto',
                      borderColor: theme.palette.secondary.main,
                      marginRight: message.idExpediteur === currentUser.userId ? '0%' : '45%',
                      marginLeft: message.idExpediteur === currentUser.userId ? '60%' : '0%',
                      flexDirection: 'column',
                      alignItems: message.idExpediteur === currentUser.userId ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      {message.idExpediteur !== currentUser.userId && <Avatar style={{ marginRight: '8px' }}>B</Avatar>}
                      <MessageComponent
                        style={{}}
                        message={message.contenuMesssage}
                        date={message.dateEnvoiMessage}
                        isCurrentUser={message.idExpediteur === currentUser.userId}
                      />
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '8px',
                width: '100%'
              }}
            >
              <TextField
                label="écrivez votre message ici"
                variant="outlined"
                fullWidth
                value={input}
                onChange={handleInputChange}
                style={{ flexGrow: 1, marginRight: '8px' }}
              />
              <Button variant="contained" color="secondary" onClick={handleSendMessage}>
                envoyer
              </Button>
            </div>
          </Paper>
        </Grid>{' '}
      </Grid>
    </>
  );
};
export default ChatPrincipale;

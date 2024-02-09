import React, { useEffect, useRef, useState } from 'react';
import {
    Avatar,
    Badge,
    Button,
    capitalize,
    Card, CardActionArea,
    CardContent,
    CardHeader,
    Divider,
    Grid, IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography
} from '@mui/material';
// import MainCard from 'ui-component/cards/MainCard';
// import ChatList from './ChatMenu';
import ChatMenu from './ChatMenu';
import axios from 'axios';
import config from '../../config';
import TotalIncomeLightCard from '../../utils/TotalIncomeLightCard';
import { useTheme } from '@mui/material/styles';
import MessageComponent from './MessageComponent';
import {IconMenu, IconMessage, IconSend} from '@tabler/icons';
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
  const [currentUser, setCurrentUser] = useState({
    id: 'USR005',
    nom: 'prisca',
    role: 'user'
  });
  const [userToken, setUserToken] = useState({});
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken.token}`
  };
  // const config = {
  //     headers: headers
  // };
  useEffect(() => {
    const getjson = async () => {
      console.log('leo ' + JSON.stringify(localStorage.getItem('simpleUserCarSell')));
      const token = await JSON.parse(localStorage.getItem('simpleUserCarSell'));
      setUserToken(token || {});
    };
    getjson();
  }, []);

  const [sentMessage, setSentMessage] = useState(0);
  const [messageRecepteur, setMessageRecepteur] = useState({ id: 'USR003', nom: 'Jessy', role: 'user' });

  const [conversation, setConversation] = useState([]);

  const link = `${config.http}://${config.host}`;
  const theme = useTheme();

  useEffect(() => {
    const getDatas = async () => {
      const datas = await axios.get(link + `/getSerndersName/${currentUser.id}`);

      setListUser(datas.data.donnee);
      if (messageRecepteur === {} && listUsers.length > 0) {
        setMessageRecepteur(listUsers[0]);
      }

      const postconversation = await axios.post(link + `/getConversation`, {
        idExpediteur: currentUser.id,
        idRecepteur: messageRecepteur.id
      });
      setConversation(postconversation.data.donnee);
    };
    getDatas();
  }, [sentMessage, messageRecepteur]);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState({});

  // const handleChangeConversation = (user) => {
  //   setMessageRecepteur(user);
  // };
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setMessages({ contenuMesssage: e.target.value, idExpediteur: currentUser.id, idRecepteur: messageRecepteur.id });
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
    console.log(user);
    // console.log(JSON.stringify(listUsers))
  };

  return (
    <Grid container spacing={2}>
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
              {getFirstLetterFromName(currentUser.nom)}
            </Avatar>
            <Typography variant="h4" align="left" className="css-1ve2rt6">
              {currentUser.nom}
            </Typography>
          </CardContent>
          {listUsers?.map((userMessage, index) => (
              <CardActionArea key={index} style={{marginBottom:'2%'}} onClick={()=>handleChangeConversation(userMessage)}>
                  <CardContent
                      sx={{ display: 'flex', alignItems: 'center',height:"50px" ,'&:hover': { backgroundColor: '#f4f8fd' } }}
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
                          {getFirstLetterFromName(userMessage.nom)}
                      </Avatar>
                      <Typography variant="body1" align="left" >
                          {userMessage.nom}
                      </Typography>
                      <Divider />
                      <IconButton style={{marginLeft:"70%", color:theme.palette.primary.dark}}>
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
                  {getFirstLetterFromName(messageRecepteur.nom)}
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
            {/*<Grid item className="css-1wxaqej"></Grid>*/}
            {/*<Grid item className="css-1wxaqej">*/}
            {/*    <Button className="css-1w8s6so" size="large" aria-label="chat user call">*/}
            {/*        <CallTwoTone className="css-vubbuv" />*/}
            {/*    </Button>*/}
            {/*</Grid>*/}
            {/*<Grid item className="css-1wxaqej">*/}
            {/*    <Button className="css-1w8s6so" size="large" aria-label="chat user video call">*/}
            {/*        <VideoCallTwoTone className="css-vubbuv" />*/}
            {/*    </Button>*/}
            {/*</Grid>*/}
            {/*<Grid item className="css-1wxaqej">*/}
            {/*    <Button className="css-1w8s6so" size="large" aria-label="chat user information">*/}
            {/*        <ErrorTwoTone className="css-vubbuv" />*/}
            {/*    </Button>*/}
            {/*</Grid>*/}
            {/*<Grid item className="css-1wxaqej">*/}
            {/*    <Button className="css-1w8s6so" size="large" aria-label="chat user details change">*/}
            {/*        <MoreHorizTwoTone className="css-vubbuv" />*/}
            {/*    </Button>*/}
            {/*</Grid>*/}
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
                    marginRight: message.idExpediteur === currentUser.id ? '0%' : '45%',
                    marginLeft: message.idExpediteur === currentUser.id ? '60%' : '0%',
                    flexDirection: 'column',
                    alignItems: message.idExpediteur === currentUser.id ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    {message.idExpediteur !== currentUser.id && <Avatar style={{ marginRight: '8px' }}>B</Avatar>}
                    <MessageComponent
                      style={{}}
                      message={message.contenuMesssage}
                      date={message.dateEnvoiMessage}
                      isCurrentUser={message.idExpediteur === currentUser.id}
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
  );
};
export default ChatPrincipale;

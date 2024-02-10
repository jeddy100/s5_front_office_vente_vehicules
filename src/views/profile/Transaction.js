import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  ButtonBase,
  CardContent,
  Grid,
  IconButton,
  Tab,
  TablePagination,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import config from '../../config';
import axios from 'axios';
import { Money } from '@mui/icons-material';
import { IconCoin } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';
import { azAZ } from '@mui/material/locale';

const Transaction = () => {
  const link = `${config.http}://${config.host}`;
  const [solde,setSolde]=useState({})
const theme = useTheme()
  const[request,setRequest]=useState(0)
const [money,setMoney]=useState(0)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("simpleUserCarSell");
    return storedUser ? JSON.parse(storedUser) : {};
  });
  const [utilisateur,setUtilisateur]=useState({})
  const [transaction, setTransaction] = useState([]);



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
  }, [request,link, user.userId]);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
////
  useEffect(() => {
    const fetchData = async () => {
      if(localStorage.getItem("simpleUserCarSell")) {
        try {
          const response = await axios.get(link + `/getListeTransactions/${user.userId}`);
          console.log("box " + JSON.stringify(response.data.donnee))

          // Assuming response.data.donnee.transactions is the array of transactions
          setTransaction(response.data.donnee.transactions);
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, [request,link, user.userId]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedTransactions = transaction.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const handleAddMoney = async () => {
    const response= await axios.post(link+"/approvisionner",{user:user.userId,montant:money})
    setRequest(request+1)
  };
  return (
    <div style={{ padding: '20px' }}>


  <Paper elevation={1} className="MuiCard-root css-10lixas" style={{ marginTop: '5px', marginBottom: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
    <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Tabs value={0} aria-label="simple tabs example">
            <Tab label={<><ReceiptLongIcon />Transaction</>}
                 href="/transaction" />
            <Tab label={<><AccountCircleTwoToneIcon />Profile</>}
                 href="/profile" />
          </Tabs>
        </Grid>
      </Grid>
    </CardContent>
  </Paper >
      <Paper elevation={1} className="MuiCard-root css-10lixas" style={{ marginTop: '5%', marginBottom: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h3" align="center">{solde?.solde}</Typography>
              <Typography variant="subtitle2" align="center">Solde Arirary</Typography>
            </Grid>
            <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="approvisionnez votre compte"
                variant="outlined"
                type={"number"}
                style={{marginRight:'2%',marginLeft:'2%'}}
                onChange={event => setMoney(event.target.value)}
              />
              <IconButton sx={{ borderRadius: '12px' , backgroundColor:theme.palette.grey.A200 }} onClick={handleAddMoney}>

              <IconCoin />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h3" align="center">{transaction.length}</Typography>
              <Typography variant="subtitle2" align="center">nombre de transactions</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>

      <Paper elevation={1} style={{ marginBottom: '3%', marginTop: '3%', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>id de transaction</TableCell>
                <TableCell>date de transaction</TableCell>
                <TableCell>montant(Ar)</TableCell>
                <TableCell>description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedTransactions.map((transact, index) => (
                <TableRow key={index}>
                  <TableCell height={50}>{transact.id}</TableCell>
                  <TableCell>{formatDate(transact.dateTransaction)}</TableCell>
                  <TableCell>{transact.montant}</TableCell>
                  <TableCell>{transact.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transaction.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>

  );
};

export default Transaction;
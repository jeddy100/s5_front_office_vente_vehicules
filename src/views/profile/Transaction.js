import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CardContent, Grid, Tab, Tabs } from '@mui/material';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import config from '../../config';
import axios from 'axios';
const Transaction = () => {
  const link = `${config.http}://${config.host}`;

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
  }, [link, user.userId]);



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
            <Tab label={<span><ReceiptLongIcon />Transaction</span>}
                 href="/transaction" />
            <Tab label={<span><AccountCircleTwoToneIcon />Profile</span>}
                 href="/profile" />
          </Tabs>
        </Grid>
      </Grid>
    </CardContent>
  </Paper>
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>date de transition</TableCell>
          <TableCell align="right">montant</TableCell>
          <TableCell align="right">annonce</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transaction?.map((transact, index) => (
        <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {transact?.dateTransaction}
          </TableCell>
          <TableCell align="right">{transact?.montant}</TableCell>
          <TableCell align="right">{transact?.annonce.id_annonce}</TableCell>
        </TableRow>
        ))}

      </TableBody>
    </Table>
  </TableContainer>
    </div>

  );
};

export default Transaction;
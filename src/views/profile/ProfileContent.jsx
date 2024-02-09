import React from 'react';
import { Breadcrumbs, Button, Card, CardContent, CardHeader, Chip, Divider, Grid, List, ListItem, ListItemText, Paper, Tab, Tabs, Typography } from '@mui/material';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';

function ProfileContent() {
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
                     href="/apps/user/account-profile/profile1" />
              </Tabs>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
      <Grid container spacing={3} style={{ marginTop: '5px' }}>
        <Grid item xs={12} lg={4}>
          <Card elevation={1} className="MuiCard-root css-10z62t2" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader title="JWT User" subheader="UI/UX Designer" />
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText primary="Email" />
                  <Typography variant="subtitle2" align="right">demo@sample.com</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Phone" />
                  <Typography variant="subtitle2" align="right">(+99) 9999 999 999</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Location" />
                  <Typography variant="subtitle2" align="right">Melbourne</Typography>
                </ListItem>
              </List>
              <CardContent>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant="h3" align="center">37</Typography>
                    <Typography variant="subtitle2" align="center">Mails</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h3" align="center">2749</Typography>
                    <Typography variant="subtitle2" align="center">Followers</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h3" align="center">678</Typography>
                    <Typography variant="subtitle2" align="center">Following</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Card elevation={1} className="MuiCard-root css-10z62t2" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader title="About me" action={<Button><EditIcon /></Button>} />
            <Divider />
            <CardContent>
              <Typography variant="subtitle2">I am UI/UX Designer</Typography>
              <Chip label="Figma" size="small" style={{ marginRight: '5px' }} />
              <Chip label="Web Designer" size="small" style={{ marginRight: '5px' }} />
              <Chip label="Adobe" size="small" style={{ marginRight: '5px' }} />
              <Chip label="Sketch" size="small" style={{ marginRight: '5px' }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileContent;

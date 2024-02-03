import React from 'react';
import { Avatar, Badge, Box, Chip, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const UserListItem = ({ name, avatarUrl, status, time, role, unreadCount, date }) => {
  return (
    <div>
      <ListItem>
        <ListItemAvatar>
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            badgeContent={<FiberManualRecordIcon fontSize="medium" />}
          >
            <Avatar src={avatarUrl} alt={name} />
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Typography variant="h5">{name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2">{time || date}</Typography>
              </Grid>
            </Grid>
          }
          secondary={
            <div>
              <Typography variant="caption">{role}</Typography>
              {unreadCount > 0 && <Chip label={unreadCount} size="medium" color="secondary" variant="filled" sx={{ marginLeft: 1 }} />}
            </div>
          }
        />
      </ListItem>
      <Divider fullWidth />
    </div>
  );
};

const UserList = () => {
  return (
    <Box className="MuiBox-root">
      <List className="MuiList-root MuiList-padding">
        <UserListItem
          name="Alene"
          avatarUrl="https://berrydashboard.io/assets/avatar-1-8ab8bc8e.png"
          status="online"
          time="2h ago"
          // role="Technical Department"
          unreadCount={2}
        />
        <UserListItem
          name="Keefe"
          avatarUrl="https://berrydashboard.io/assets/avatar-2-0527ad51.png"
          status="online"
          time="1:20 AM"
          // role="Support Executive"
          unreadCount={3}
        />
        {/* ... Continue adding other UserListItem components for each user */}
      </List>
    </Box>
  );
};

export default UserList;

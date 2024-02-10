import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {Avatar, Box, Button, ButtonBase} from '@mui/material';

// project imports
import LogoSection from 'layout/MainLayout/LogoSection';
import SearchSection from 'layout/MainLayout/Header/SearchSection';

import { useNavigate } from 'react-router-dom';
const HeaderLanding = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
const navigate=useNavigate()
    const HandleSeConnecter = () => {
        navigate('/login');
    };
  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          },
        }}

      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
        <Button variant="text"   color="dark" style={
            {
                // color:theme.palette.grey["500"],
                margin:"auto 1.5% ",
                textTransform:'uppercase',
                // fontWeight:'bold',
                letterSpacing:'1px'
            }
        }>filtres</Button>
        <Button variant="text" color="dark" style=
            {
                {
                    margin:"auto 1.5% ",
                    // color: theme.palette.grey["500"],
                    textTransform: 'uppercase',
                    // fontWeight: 'bold',
                    letterSpacing:'1px'
                }
            }>Annonces</Button>

        <Button
            color={"secondary"}
            variant={"contained"}
            style={{
                margin:"auto 2% auto 4% ",
                letterSpacing:'1px'
            }}
            onClick={HandleSeConnecter}
        >se connecter</Button>
    </>
  );
};

HeaderLanding.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default HeaderLanding;

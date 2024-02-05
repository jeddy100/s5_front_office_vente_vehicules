import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../../../hooks/useScriptRef';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from '../../../../assets/images/icons/social-google.svg';
import axios from 'axios';
import config from '../../../../config';
import { Navigate, useNavigate } from 'react-router-dom';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const link = `${config.http}://${config.host}`;
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [user,setUser]= useState({});
  // useEffect(() => {
  //   if(user!=={}){
  //     navigate("/")
  //   }
  // }, [user]);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginConnexion = async () => {
    const response = await axios.post(link + '/user/authenticate');
  };
  console.log(localStorage.getItem("adminUserCarSell")!==null)

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center"></Grid>
      </Grid>

      <Formik
        initialValues={{
          email: 'mytyrealy2@gmail.com',
          password: 'prisca123',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email("l'email doit être valide ").max(255).required("L'email est requis"),
          password: Yup.string().max(255).required('le mot de passe est requis').min(8, 'Le mot de passe doit avoir au moins 8 caractères')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              console.log('login yay');
              const response = await axios.post(link + '/user/authenticate', { email: values.email, password: values.password });
              console.log(JSON.stringify(response.data));
              let data= {
                token: response.data.token,
                userId:response.data.userId
              }
              localStorage.setItem("adminUserCarSell",JSON.stringify(data))
              document.cookie = `token=${JSON.stringify(data)}; max-age=3600; path=/`;

              navigate('/')
              window.location.reload();


              // setUser(localStorage.getItem("adminUserCarSell"))

            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              if (err.response && err.response.status === 403) {
                setErrors({ submit: 'Email ou mot de passe invalide.' });
              } else {
                setErrors({ submit: "Oups , Une erreur s'est produite" });
              }
              // setStatus({ success: false });
              // setErrors({ submit: err.message });
              // setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            {/*<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>*/}
            {/*  <FormControlLabel*/}
            {/*    control={*/}
            {/*      <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />*/}
            {/*    }*/}
            {/*    label="Remember me"*/}
            {/*  />*/}
            {/*  <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>*/}
            {/*    Forgot Password?*/}
            {/*  </Typography>*/}
            {/*</Stack>*/}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;

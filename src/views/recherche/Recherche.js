import { Card, CardContent, Grid, TextField, Typography, InputLabel, Select, MenuItem, FormControl, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import ErrorAlert from '../../ui-component/alert/ErrorAlert';
import {useNavigate} from "react-router";

const Recherche = () => {
  const theme = useTheme();
  const navigate= useNavigate();
  const [formdata, setFormdata] = useState({
    idModele: 'tous',
    idMarque: 'tous',
    prix1: 0,
    prix2: 100000000000,
    annee1: 0,
    annee2: 10000,
    km1: 0,
    km2: 1000000,
    poids1: 0,
    poids2: 100000000000,
    date1: "2020-01-01 00:00",
    date2: "2025-01-01 00:00",
    idBoite: 'tous',
    idCarburant: 'tous',
    idCouleur: 'tous',
    idMoteur: 'tous',
    idPays: 'tous'
  });
  const link = `${config.http}://${config.host}`;

  const [marque, setMarque] = useState([]);
  const [boite, setBoite] = useState([]);
  const [modele, setModele] = useState([]);
  const [carburant, setCarburant] = useState([]);
  const [couleur, setCouleur] = useState([]);
  const [moteur, setMoteur] = useState([]);
  const [pays, setPays] = useState([]);
  const [hasError, setHasError] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(link + '/getSearchPage');
      if (response.data.erreur === '' || response.data.erreur === null || response.data.erreur.isEmpty()) {
        setMarque(response.data.donnee.marque);
        setModele(response.data.donnee.models);
        setBoite(response.data.donnee.boite);
        setCarburant(response.data.donnee.carburant);
        setCouleur(response.data.donnee.couleurs);
        setMoteur(response.data.donnee.moteur);
        setPays(response.data.donnee.pays);
      }
    };
    fetchData();
  }, []);

  console.log(JSON.stringify(formdata));

  const resetFormfata = () => {
    return {
      idModele: '',
      idMarque: '',
      prix1: 0,
      prix2: 0,
      annee1: 0,
      annee2: 0,
      km1: 0,
      km2: 0,
      poids1: 0,
      poids2: 0,
      date1: '',
      date2: '',
      idBoite: '',
      idCarburant: '',
      idCouleur: '',
      idMoteur: '',
      idPays: ''
    };
  };
  const [erreurs, setErreurs] = useState({
  });

  const validateForm = () => {
    const fields = ['prix', 'date', 'poids', 'km', 'annee'];
    const fieldsSingle = ['idModele', 'idMarque', 'idBoite', 'idCarburant', 'idCouleur','idMoteur','idPays'];
    const errors = {};

    fields.forEach((field) => {
      const field1 = formdata[`${field}1`];
      const field2 = formdata[`${field}2`];

      // Check required fields
      if (!field1 || !field2) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} est requis`;
      }

      // Check non-negativity
      if (field1 < 0 || field2 < 0) {
        errors[`${field}Negative`] = `${field.charAt(0).toUpperCase() + field.slice(1)} ne doit pas être negative`;
      }

      // Check comparisons
      if (formdata[`${field}1`] >= formdata[`${field}2`]) {
        errors[`${field}Comparison`] = `${field.charAt(0).toUpperCase() + field.slice(1)} maximum doit être plus grand que ${field.charAt(0).toUpperCase() + field.slice(1)} minimum`;
      }

    });

    const fieldsToCheck = ['idMarque', 'idModele', 'idMoteur', 'idPays', 'idBoite', 'idCarburant', 'idCouleur'];
    fieldsToCheck.forEach((field) => {
      if (formdata[field] === '') {
        errors[field] = `veuillez séléctionner une valeur pour  ${field.replace("id","")}`;
      }
    });

    return errors;
  };


  const handleInputChange = (event) => {
    // Récupérer la valeur de l'input
    const inputValue = event.target.value;

    // Afficher la valeur dans la console
    console.log('Input Value:', inputValue);
  };
  const handleValidation = async () => {
    // setErreurs(validateForm())
    const datas= JSON.stringify(formdata)
    navigate(`/annonce?searchMulti=${datas}`)
    console.log(JSON.stringify(validateForm()))
    const response = await axios.post(link + '/form_recherche_multicritere', formdata);
    console.log(JSON.stringify("recherche : "+response.data.donnee));
  };

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <>
      <Grid container>
        <Typography variant={'h3'} color={theme.palette.grey.A700}>
          Filtrer les annonces
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {/*prix de vente */}
        <Grid item xs={3} sm={4}>
          <Card elevation={1} style={{ marginTop: '4%', width: '100%', maxHeight: '200px', paddingBottom: '0.5%' }}>
            <CardContent>
              <Typography marginX={2} variant={'subtitle2'} fontSize={20}>
                Prix de vente
              </Typography>

              <TextField
                label={'prix minimum'}
                inputProps={{ type: 'number' }}
                style={{ margin: '2%', width: '45%' }}
                onChange={(e) => setFormdata({ ...formdata, prix1: e.target.value })}
                error={erreurs.prix||erreurs.prixComparison||erreurs.prixNegative}
              />
              <TextField
                label={'prix maximum'}
                inputProps={{ type: 'number' }}
                style={{ margin: '2%', width: '45%' }}
                onChange={(e) => setFormdata({ ...formdata, prix2: e.target.value })}
                error={erreurs.prix||erreurs.prixComparison||erreurs.prixNegative}

              />
              {erreurs.prix && <ErrorAlert message={erreurs.prix}> </ErrorAlert> }
              {erreurs.prixComparison && <ErrorAlert message={erreurs.prixComparison}> </ErrorAlert> }
              {erreurs.prixNegative && <ErrorAlert message={erreurs.prixNegative} ></ErrorAlert> }



            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3} sm={8}>
          <Card elevation={1} style={{ marginTop: '2%', width: '100%', maxHeight: '200px', paddingBottom: '0.5%' }}>
            <CardContent>
              <Typography marginX={2} variant={'subtitle2'} fontSize={20}>
                Date de l&apos;annonce
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3} sm={6}>
                  <InputLabel style={{ marginLeft: '2.5%', marginTop: '1%' }} id="demo-simple-select-label">
                    date minimum :
                  </InputLabel>
                  <TextField
                    inputProps={{ type: 'date' }}
                    style={{ margin: '2%', width: '95%' }}
                    onChange={(e) => setFormdata({ ...formdata, date1: e.target.value })}
                    error={erreurs.dateComparison||erreurs.date}

                  />
                </Grid>
                <Grid item xs={3} sm={6}>
                  <InputLabel style={{ marginLeft: '2.5%', marginTop: '1%' }} id="demo-simple-select-label">
                    date maximum :
                  </InputLabel>
                  <TextField
                    inputProps={{ type: 'date' }}
                    style={{ margin: '2%', width: '95%' }}
                    onChange={(e) => setFormdata({ ...formdata, date2: e.target.value })}
                    error={erreurs.dateComparison||erreurs.date}
                  />
                </Grid>

                {erreurs.dateComparison && <ErrorAlert message={erreurs.dateComparison}> </ErrorAlert> }
                {erreurs.date && <ErrorAlert message={erreurs.date}> </ErrorAlert> }
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginY={'2%'}>
        <Grid item xs={3} sm={4}>
          <Card elevation={1}>
            <CardContent>
              <Typography marginX={2} variant={'subtitle2'} fontSize={20}>
                {' '}
                Poids du véhicule
              </Typography>
              <TextField
                label={'poids minimum'}
                inputProps={{ type: 'number' }}
                style={{ margin: '2%', width: '45%' }}
                onChange={(e) => setFormdata({ ...formdata, poids1: e.target.value })}
                error={erreurs.poidsNegative||erreurs.poids||erreurs.poidsComparison}
              />
              <TextField
                label={'poids maximum'}
                inputProps={{ type: 'number' }}
                style={{ margin: '2%', width: '45%' }}
                onChange={(e) => setFormdata({ ...formdata, poids2: e.target.value })}
                error={erreurs.poidsNegative||erreurs.poids||erreurs.poidsComparison}
              />
              {erreurs.poids && <ErrorAlert message={erreurs.poids}> </ErrorAlert> }
              {erreurs.poidsComparison && <ErrorAlert message={erreurs.poidsComparison}> </ErrorAlert> }
              {erreurs.poidsNegative && <ErrorAlert message={erreurs.poidsNegative} ></ErrorAlert> }

            </CardContent>
          </Card>

          {/*  */}
          <Card elevation={1} style={{ marginTop: '4%' }}>
            <CardContent>
              <Typography marginX={2} variant={'subtitle2'} fontSize={20}>
                {' '}
                kilometrage du véhicule
              </Typography>
              <TextField
                label={'km minimum'}
                inputProps={{ type: 'number' }}
                style={{ margin: '2%', width: '45%' }}
                onChange={(e) => setFormdata({ ...formdata, km1: e.target.value })}
                error={erreurs.kmComparison||erreurs.km||erreurs.kmComparison}

              />
              <TextField
                label={'km maximum'}
                inputProps={{ type: 'number' }}
                style={{ margin: '2%', width: '45%' }}
                onChange={(e) => setFormdata({ ...formdata, km2: e.target.value })}
                error={erreurs.kmComparison||erreurs.km||erreurs.kmNegative}

              />

              {erreurs.km && <ErrorAlert message={erreurs.km}> </ErrorAlert> }
              {erreurs.kmComparison && <ErrorAlert message={erreurs.kmComparison}> </ErrorAlert> }
              {erreurs.kmNegative && <ErrorAlert message={erreurs.kmNegative} ></ErrorAlert> }

            </CardContent>
          </Card>

          {/*  */}
          <Card elevation={1} style={{ marginTop: '4%' }}>
            <CardContent>
              <Typography marginX={2} variant={'subtitle2'} fontSize={20}>
                Année de fabrication
              </Typography>
              <TextField
                label={'Année minimum'}
                inputProps={{ type: 'number' }}
                style={{ margin: '2%', width: '45%' }}
                onChange={(e) => setFormdata({ ...formdata, annee1: e.target.value })}
                error={erreurs.anneeComparison||erreurs.annee||erreurs.anneeNegative}

              />
              <TextField
                label={'Année maximum'}
                inputProps={{ type: 'number' }}
                style={{ margin: '2%', width: '45%' }}
                onChange={(e) => setFormdata({ ...formdata, annee2: e.target.value })}
                error={erreurs.anneeComparison||erreurs.annee||erreurs.anneeNegative}

              />
              {erreurs.annee && <ErrorAlert message={erreurs.annee}> </ErrorAlert> }
              {erreurs.anneeComparison && <ErrorAlert message={erreurs.anneeComparison}> </ErrorAlert> }
              {erreurs.anneeNegative && <ErrorAlert message={erreurs.anneeNegative} ></ErrorAlert> }

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3} sm={8}>
          <Card elevation={1}>
            <CardContent>
              <Typography marginX={2} variant={'subtitle2'} fontSize={20}>
                Fiche technique du véhicule{' '}
              </Typography>

              {/*marque du vehicule*/}
              <FormControl style={{ width: '45%', margin: ' 3% 2%' }}>
                <InputLabel id="demo-simple-select-label">Marque :</InputLabel>
                <Select label={'marque'}
                        error={erreurs.idMarque}
                        onChange={(e) => setFormdata({ ...formdata, idMarque: e.target.value })}>
                  <MenuItem value={'tous'}>tous</MenuItem>
                  {marque?.map((marq, index) => (
                    <MenuItem key={index} value={marq.id_marque}>
                      {marq.nom_marque}
                    </MenuItem>
                  ))}
                </Select>
                {erreurs.idMarque && <ErrorAlert message={erreurs.idMarque}> </ErrorAlert> }

              </FormControl>


              {/*Modele du vehicule*/}
              <FormControl style={{ width: '45%', margin: ' 3% 2%' }}>
                <InputLabel id="demo-simple-select-label">Modèle :</InputLabel>
                <Select label={'Modèle'}
                        error={erreurs.idModele}
                        onChange={(e) => setFormdata({ ...formdata, idModele: e.target.value })}>
                  <MenuItem value={'tous'}>tous</MenuItem>
                  {modele?.map((modele_r, index) => (
                    <MenuItem key={index} value={modele_r.id_modele}>
                      {modele_r.nom_modele}
                    </MenuItem>
                  ))}
                </Select>
                {erreurs.idModele && <ErrorAlert message={erreurs.idModele}> </ErrorAlert> }

              </FormControl>

              {/*Moteur du vehicule*/}
              <FormControl style={{ width: '45%', margin: ' 3% 2%' }}>
                <InputLabel id="demo-simple-select-label">Moteur :</InputLabel>
                <Select label={'Moteur'}
                        error={erreurs.idMoteur}
                        onChange={(e) => setFormdata({ ...formdata, idMoteur: e.target.value })}>
                  <MenuItem value={'tous'}>tous</MenuItem>
                  {moteur?.map((moteur_r, index) => (
                    <MenuItem key={index} value={moteur_r.id_moteur}>
                      {moteur_r.nom_moteur}
                    </MenuItem>
                  ))}
                </Select>
                {erreurs.idMoteur && <ErrorAlert message={erreurs.idMoteur}> </ErrorAlert> }

              </FormControl>

              {/*Paye du vehicule*/}
              <FormControl style={{ width: '45%', margin: ' 3% 2%' }}>
                <InputLabel id="demo-simple-select-label">Pays :</InputLabel>
                <Select label={'Pays'}
                        error={erreurs.idPays}

                        onChange={(e) => setFormdata({ ...formdata, idPays: e.target.value })}>
                  <MenuItem value={'tous'}>tous</MenuItem>
                  {pays?.map((pays_r, index) => (
                    <MenuItem key={index} value={pays_r.id_pays}>
                      {pays_r.nom_pays}
                    </MenuItem>
                  ))}
                </Select>
                {erreurs.idPays && <ErrorAlert message={erreurs.idPays}> </ErrorAlert> }

              </FormControl>

              {/*boite du vehicule*/}
              <FormControl style={{ width: '45%', margin: ' 3% 2%' }}>
                <InputLabel id="demo-simple-select-label">Boite de vitesse :</InputLabel>
                <Select label={'Boite de vitesse '}
                        error={erreurs.idBoite}
                        onChange={(e) => setFormdata({ ...formdata, idBoite: e.target.value })}>
                  <MenuItem value={'tous'}>tous</MenuItem>
                  {boite?.map((boite_r, index) => (
                    <MenuItem key={index} value={boite_r.id_boite}>
                      {boite_r.nom_boite}
                    </MenuItem>
                  ))}
                </Select>
                {erreurs.idBoite && <ErrorAlert message={erreurs.idBoite}> </ErrorAlert> }

              </FormControl>

              {/*carburant du vehicule*/}
              <FormControl style={{ width: '45%', margin: ' 3% 2%' }}>
                <InputLabel id="demo-simple-select-label">Carburant :</InputLabel>
                <Select label={'Carburant'}
                        error={erreurs.idCarburant}
                        onChange={(e) => setFormdata({ ...formdata, idCarburant: e.target.value })}>
                  <MenuItem value={'tous'}>tous</MenuItem>
                  {carburant?.map((carburant_r, index) => (
                    <MenuItem key={index} value={carburant_r.id_carburant}>
                      {carburant_r.nom_carburant}
                    </MenuItem>
                  ))}
                </Select>
                {erreurs.idCarburant && <ErrorAlert message={erreurs.idCarburant}> </ErrorAlert> }

              </FormControl>
              {/*couleur du vehicule*/}
              <FormControl style={{ width: '95%', margin: ' 3% 2%' }}>
                <InputLabel id="demo-simple-select-label">Couleur :</InputLabel>
                <Select label={'Couleur'}
                        error={erreurs.idCouleur}
                        onChange={(e) => setFormdata({ ...formdata, idCouleur: e.target.value })}>
                  <MenuItem value={'tous'}>tous</MenuItem>
                  {couleur?.map((couleur_r, index) => (
                    <MenuItem key={index} value={couleur_r.id_couleur}>
                      {couleur_r.nom_couleur}
                    </MenuItem>
                  ))}
                </Select>
                {erreurs.idCouleur && <ErrorAlert message={erreurs.idCouleur}> </ErrorAlert> }


              </FormControl>

              {/*<TextField label={"poids maximum"} inputProps={{ type: 'number'}}  style={{margin:'2%'}} />*/}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Button variant={'contained'} onClick={handleValidation}>
          Valider les filtres
</Button>
</Grid>
</>
);
};
export default Recherche;

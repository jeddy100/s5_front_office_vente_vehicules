// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import {Recherche} from "../recherche/Recherche";
import StatutsAnnonce from "../../ui-component/annonce/StatutsAnnonce";

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <MainCard title="Sample Card">
    <Typography variant="body2">
     <StatutsAnnonce etat={-10}></StatutsAnnonce>
    </Typography>
  </MainCard>
);

export default SamplePage;

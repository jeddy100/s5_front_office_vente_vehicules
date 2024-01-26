import { Badge as BaseBadge, badgeClasses } from '@mui/base/Badge';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {BadgeMark, getTableSortLabelUtilityClass} from "@mui/material";
import {IconBadge} from "@tabler/icons";

const StatutsAnnonce = ({ etat }) => {
  const background = () => {
    if (etat === 0) {
      return themes.palette.grey['900'];
    } else if (etat === 10) {
      return themes.palette.success.main;
      // You can set text color here if needed
    } else if (etat === 20) {
      return themes.palette.error.dark;
      // You can set text color here if needed
    } else {
      return themes.palette.warning.dark;
      // You can set text color here if needed
    }
  };
  const themes = useTheme();
  const content =()=>{
      if (etat === 0) {
          return "en attente";
      } else if (etat === 10) {
          return "dispo";
          // You can set text color here if needed
      } else if (etat === 20) {
          return "Vendu";
          // You can set text color here if needed
      } else {
          return "refusé";
          // You can set text color here if needed
      }
  }
  const [color, setColor] = useState('#fff');
  console.log(background());

  const Badge = styled(BaseBadge)(
    ({ theme }) => `
  box-sizing: border-box;
  margin: 1% 10%;
  
  padding: 0;
  font-size: 14px;
  list-style: none;
  font-family: 'IBM Plex Sans', sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeClasses.badge} {
    z-index: auto;
    position: absolute;
    top: 0;
    right: 0;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    color:${color};
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    white-space: nowrap;
    text-align: center;
    border-radius: 12px;
    background: ${background()};
    box-shadow: 0px 4px 6x ${ themes.palette.grey['300']};
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
  `
  );

  // if (etat === 0) {
  //   setContent('en attente');
  //   setColor(themes.palette.grey['600']);
  // } else if (etat === 10) {
  //   setContent('approuvé');
  //   setColor(themes.palette.secondary.light);
  // }
  return (
    <>
      <Badge badgeContent={content()}></Badge>
    </>
  );
};
export default StatutsAnnonce;

import pages from './pages';
import other from './other';
import chatMenu from "./chatMenu";
import {searchMenu} from "./searchMenu";
import AnnonceMenu from "./AnnonceMenu";
import ProfileMenu from './ProfileMenu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [ chatMenu,searchMenu,AnnonceMenu,ProfileMenu]
};

export default menuItems;

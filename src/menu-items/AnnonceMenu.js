import {IconAdjustments, IconCar, IconHeart} from "@tabler/icons";

const icons = { IconCar,IconHeart };

const AnnonceMenu = {
    id: 'annonce',
    title: 'Annonces',
    type: 'group',
    children: [
        {
            id: 'annonce',
            title: 'Annonce',
            type: 'item',
            url: '/annonce',
            icon: icons.IconCar,
            breadcrumbs: false
        },{
            id: 'favori',
            title: 'favoris',
            type: 'item',
            url: '/favorisAnnonce',
            icon: icons.IconHeart,
            breadcrumbs: false
        }
    ]
};
export default AnnonceMenu;
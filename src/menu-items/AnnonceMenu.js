import {IconAdjustments, IconCar} from "@tabler/icons";

const icons = { IconCar };

const AnnonceMenu = {
    id: 'annonce',
    title: 'Annonces',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Annonce',
            type: 'item',
            url: '/annonce',
            icon: icons.IconCar,
            breadcrumbs: false
        }
    ]
};
export default AnnonceMenu;
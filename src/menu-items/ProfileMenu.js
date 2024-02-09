import {IconAdjustments, IconCar} from "@tabler/icons";

const icons = { IconCar };

const ProfileMenu = {
    id: 'profile',
    title: 'Profile',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Profile',
            type: 'item',
            url: '/profile',
            icon: icons.IconCar,
            breadcrumbs: false
        }
    ]
};
export default ProfileMenu;
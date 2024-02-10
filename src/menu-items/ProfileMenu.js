import { IconAdjustments, IconCar, IconUser } from '@tabler/icons';

const icons = { IconUser };
const ProfileMenu = {
    id: 'profile',
    title: 'Profile',
    type: 'group',
    children: [
        {
            id: 'jifd',
            title: 'Profile',
            type: 'item',
            url: '/profile',
            icon: icons.IconUser,
            breadcrumbs: false
        }
    ]
};
export default ProfileMenu;
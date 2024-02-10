import { IconMessage } from '@tabler/icons';

// constant
const icons = { IconMessage };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const chatMenu = {
  id: 'chat',
  title: 'Message',
  type: 'group',
  children: [
    {
      id: 'ds',
      title: 'Message',
      type: 'item',
      url: '/chat',
      icon: icons.IconMessage,
      breadcrumbs: false
    }
  ]
};

export default chatMenu;

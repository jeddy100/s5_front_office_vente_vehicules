import { IconAdjustments } from '@tabler/icons';
const icons = { IconAdjustments };

export const searchMenu = {
  id: 'Filtres',
  title: 'recherches approfondies',
  type: 'group',
  children: [
    {
      id: 'as',
      title: 'Filtres',
      type: 'item',
      url: '/recherche',
      icon: icons.IconAdjustments,
      breadcrumbs: false
    }
  ]
};

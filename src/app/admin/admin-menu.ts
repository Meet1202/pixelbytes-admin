import {NbMenuItem} from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/admin/home',
    home: true,
  },
  {
    title: 'Categories',
    icon: 'keypad-outline',
    children: [
      {
        title: 'Items List',
        link: '/admin/categories/menu',
      },
      {
        title: 'Category List',
        link: '/admin/categories/category',
      },
      {
        title: 'Sub Category List',
        link: '/admin/categories/sub-category',
      },
    ],
  },
  {
    title: 'Enquiry list',
    icon: 'file-text-outline',
    link: '/admin/enquiry',
  },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'User',
    icon: 'people-outline',
    link: '/admin/user',
  },
  {
    title: 'Subscription',
    icon: 'pricetags-outline',
    link: '/admin/subscription',
  },
  {
    title: 'Contact',
    icon: 'phone-call-outline',
    link: '/admin/contact',
  },
];

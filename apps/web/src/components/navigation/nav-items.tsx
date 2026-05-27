import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';

import TaskRoundedIcon from '@mui/icons-material/TaskRounded';

import EventRoundedIcon from '@mui/icons-material/EventRounded';

import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';

import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';

export const navItems = [
  {
    label: 'Dashboard',

    path: '/',

    icon: DashboardRoundedIcon,

    roles: [
      'SUPER_ADMIN',
      'ADMIN',
      'HR',
      'EMPLOYEE',
    ],
  },

  {
    label: 'Projects',

    path: '/projects',

    icon:
      FolderRoundedIcon,

    roles: [
      'SUPER_ADMIN',
      'ADMIN',
      'HR',
      'EMPLOYEE',
    ],
  },

  {
    label: 'Tasks',

    path: '/tasks',

    icon: TaskRoundedIcon,

    roles: [
      'SUPER_ADMIN',
      'ADMIN',
      'HR',
     
    ],
  },

  {
    label: 'Meetings',

    path: '/meetings',

    icon: EventRoundedIcon,

    roles: [
      'SUPER_ADMIN',
      'ADMIN',
      'HR',
      'EMPLOYEE',
    ],
  },

  {
    label: 'Calendar',

    path: '/calendar',

    icon: CalendarMonthRoundedIcon,

    roles: [
      'SUPER_ADMIN',
      'ADMIN',
      'HR',
      'EMPLOYEE',
    ],
  },

  {
    label: 'Documents',

    path: '/documents',

    icon:
      DescriptionRoundedIcon,

    roles: [
      'SUPER_ADMIN',
      'ADMIN',
      'HR',
      'EMPLOYEE',
    ],
  },

  {
    label: 'Chat',

    path: '/chat',

    icon:
      ChatRoundedIcon,

    roles: [
      'SUPER_ADMIN',
      'ADMIN',
      'HR',
      'EMPLOYEE',
    ],
  },

  {
    label: 'Reimbursements',

    path: '/reimbursements',

    icon: ReceiptLongRoundedIcon,

    roles: [
      'SUPER_ADMIN',
      'ADMIN',
      'HR',
      'EMPLOYEE',
    ],
  },

  {
    label: 'Users',

    path: '/users',

    icon: PeopleRoundedIcon,

    roles: [
      'SUPER_ADMIN',
      'ADMIN',
    ],
  },

  {
    label: 'Analytics',

    path: '/analytics',

    icon: InsightsRoundedIcon,

    roles: [
      'SUPER_ADMIN',
      'ADMIN',
    ],
  },

  {
    label: 'Leaves',

    path: '/leaves',

    icon: EventBusyRoundedIcon,

    roles: [
      'SUPER_ADMIN',
      'ADMIN',
      'HR',
      'EMPLOYEE',
    ],
  },

  {
    label: 'Profile',

    path: '/profile',

    icon: PersonRoundedIcon,

    roles: [
      'SUPER_ADMIN',
      'ADMIN',
      'HR',
      'EMPLOYEE',
    ],
  },
];
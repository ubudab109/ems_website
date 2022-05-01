import { lazy } from 'react';
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Employee = lazy(() => import('../pages/employee/Employee'));
const Management = lazy(() => import('../pages/management/Management'));
const Payroll = lazy(() => import('../pages/payroll/Payroll'));
const Schedule = lazy(() => import('../pages/schedule/Schedule'));
const Absen = lazy(() => import('../pages/absent/Absen'));
export const Profile = lazy(() => import('../pages/profile/Profile'));

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    exact: true,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/dashboard.png`,
  },
  {
    path: '/attendance-management',
    component: Absen,
    name: 'Absen',
    exact: false,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/Scan.png`,
  },
  {
    path: '/payroll',
    component: Payroll,
    name: 'Payroll',
    exact: true,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/Paper.png`,
  },
  {
    path: '/schedule',
    component: Schedule,
    name: 'Schedule',
    exact: true,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/Calendar.png`,
  },
  {
    path: '/employee',
    component: Employee,
    name: 'Employee',
    exact: true,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/2 User.png`,
  },
  {
    path: '/management',
    component: Management,
    name: 'Management',
    exact: false,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/Add User.png`,
  },
  
];

export default routes;

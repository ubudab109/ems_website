import { lazy } from 'react';
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Employee = lazy(() => import('../pages/employee/Employee'));
const Management = lazy(() => import('../pages/management/Management'));
const Payroll = lazy(() => import('../pages/payroll/Payroll'));
const Schedule = lazy(() => import('../pages/schedule/Schedule'));
const Absen = lazy(() => import('../pages/absent/Absen'));
export const Profile = lazy(() => import('../pages/profile/Profile'));
const AddRolePermission = lazy(() => import('../pages/management/views/AddRolePermission'));
const AddEmployee = lazy(() => import('../pages/employee/AddEmployee'));

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    parentRoute : '',
    name: 'Dashboard',
    isSubRoute: false,
    listPermissions : 'dashboard-page',
    scopePermissions: 'Dashboard',
    exact: true,
    withoutPermissions: false,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/dashboard.png`,
  },
  {
    path: '/attendance-management',
    component: Absen,
    parentRoute : '',
    listPermissions : 'attendance-management-list',
    scopePermissions: 'Attendance',
    name: 'Absen',
    isSubRoute: false,
    exact: true,
    withoutPermissions: false,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/Scan.png`,
  },
  {
    path: '/payroll',
    component: Payroll,
    parentRoute : '',
    listPermissions : 'payroll-management-list',
    scopePermissions: 'Payroll',
    name: 'Payroll',
    isSubRoute: false,
    exact: true,
    withoutPermissions: false,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/Paper.png`,
  },
  {
    path: '/schedule',
    component: Schedule,
    parentRoute : '',
    listPermissions: 'schedule-request-list',
    scopePermissions: 'Schedule',
    name: 'Schedule',
    isSubRoute: false,
    exact: true,
    withoutPermissions: false,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/Calendar.png`,
  },
  {
    path: '/employee',
    component: Employee,
    parentRoute : '',
    name: 'Employee',
    isSubRoute: false,
    listPermissions: 'employee-management-list',
    scopePermissions: 'Employee',
    exact: true,
    withoutPermissions: false,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/2 User.png`,
  },
  {
    path: '/employee/add-employee',
    component: AddEmployee,
    parentRoute : '/employee',
    isSubRoute: true,
    listPermissions : '',
    scopePermissions: '',
    name: '',
    exact: false,
    icon: ``,
    withoutPermissions: true,
  },
  {
    path: '/management',
    component: Management,
    parentRoute : '',
    listPermissions: 'user-management-permission-list',
    scopePermissions: 'Management',
    name: 'Management',
    isSubRoute: false,
    exact: true,
    withoutPermissions: false,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/Add User.png`,
  },
  {
    path: '/management/add-role',
    component: AddRolePermission,
    parentRoute : '/management',
    isSubRoute: true,
    listPermissions : 'user-management-permission-create',
    scopePermissions: 'Management',
    name: '',
    exact: false,
    withoutPermissions: false,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/Scan.png`,
  },
  {
    path: '/profile',
    component: Profile,
    parentRoute : '',
    isSubRoute: true,
    listPermissions : '',
    scopePermissions: '',
    name: '',
    exact: false,
    icon: ``,
    withoutPermissions: true,
  },
  
];

export default routes;

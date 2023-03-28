import { lazy } from "react";

const SuperadminDashboard = lazy(() => import('../pages/superadmin/dashboard/SuperadminDashboard'));
const Branch = lazy(() => import('../pages/superadmin/branch/Branch'));
const CompanySetting = lazy(() => import('../pages/superadmin/company-setting/CompanySetting'));
const SalaryComponent = lazy(() => import('../pages/superadmin/salary-component/SalaryComponent'));

const superadminRoutes = [
  {
    path: '/dashboard',
    component: SuperadminDashboard,
    parentRoute : '',
    name: 'Dashboard',
    isSubRoute: false,
    listPermissions : 'dashboard-page',
    scopePermissions: 'Dashboard',
    exact: true,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/dashboard.png`,
  },
  {
    path: '/branch',
    component: Branch,
    parentRoute : '',
    name: 'Company Branch',
    isSubRoute: false,
    listPermissions : 'branch-list',
    scopePermissions: 'Branch',
    exact: true,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/dashboard.png`,
  },
  {
    path: '/company-setting',
    component: CompanySetting,
    parentRoute : '',
    name: 'Company Setting',
    isSubRoute: false,
    listPermissions : 'branch-list',
    scopePermissions: 'Branch',
    exact: true,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/dashboard.png`,
  },
  {
    path: '/salary-component',
    component: SalaryComponent,
    parentRoute : '',
    name: 'SalaryComponent',
    isSubRoute: false,
    listPermissions : 'branch-list',
    scopePermissions: 'Branch',
    exact: true,
    icon: `${process.env.PUBLIC_URL}/assets/icon_menu/dashboard.png`,
  }

];

export default superadminRoutes;

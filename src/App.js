import React, { Fragment, Suspense, useEffect } from 'react';
import Navbar from './layouts/Navbar';
import Sidebar from './layouts/Sidebar';
import swal from 'sweetalert';
import { Route, Switch } from 'react-router-dom';
import routes, { Profile } from './route/Route';
import { GuestRoute, PrivateRoute } from './route/RouteHelper';
import Login from './pages/auth/Login';
import { clearAllItem, getStore, isActionAllowed } from './utils/helper';
import http from './service/PrivateConfigRequest';
import { connect, useSelector } from 'react-redux';
import './assets/sass/App.scss';
import Forbidden from './pages/forbidden/Forbidden';
import superadminRoutes from './route/RouteSuperadmin';
import DetailEmployee from './pages/employee/components/DetailEmployee/DetailEmployee';


const App = () => {



  /**
   * Selector to get data permissions from redux
   */
  const permissions = useSelector(state => state.auth.permissions);
  const isSuperAdmin = useSelector(state => state.auth.isSuperAdmin);
  // const [permissions, setPermissions] = useState([]);
  const isLoggedIn = localStorage.getItem('web-token');
  useEffect(() => {
    if (getStore('web-token')) {
      http.post('validate').then((res) => {
        // setPermissions(dataPermissions);
      }).catch((err) => {
        swal(`Your Session Was Expired. You Will Be Logged Out`, {
          icon: "error",
        }).then((val) => {
          clearAllItem();
          window.location.href = '';
        })
      })
    }
  });

  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center">

        </div>
      }
    >
      <Switch>
        <GuestRoute exact path="/" component={Login} />
        <Fragment>
          <div className="d-flex" id="wrapper">
            <Sidebar />
            {/* <!-- Page content wrapper--> */}
            <div id="page-content-wrapper">
              <Navbar />
              {/* <!-- Page content--> */}
              <div className="container-fluid">
                {/* CONTENT HERE */}
                {
                  isSuperAdmin ?
                    superadminRoutes.map((route, index) => {
                      return (
                        <PrivateRoute
                          key={index}
                          {...route}
                          canAccess={true}
                        />
                      )
                    }) :
                    routes.map((route, index) => {
                      return (
                        <PrivateRoute
                          key={index}
                          {...route}
                          canAccess={
                            isLoggedIn && !route.withoutPermissions ?
                              isActionAllowed(
                                permissions.filter(
                                  e => e.name === route.scopePermissions)[0].permissions,
                                route.listPermissions
                              )
                              : true
                          }
                        />
                      )
                    })
                }
                <Route exact path="/forbidden" component={Forbidden} />
                {/* Testing */}
                {/* <Route exact path="/detail" component={DetailEmployee} /> */}
              </div>
            </div>
          </div>
        </Fragment>
      </Switch>
    </Suspense>
  );
}



export default connect(null, null)(App);

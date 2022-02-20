// import { createBrowserHistory } from "history"
import React from "react"
import { Redirect, Route, useHistory } from "react-router"
import { useLocation } from "react-router-dom"
import Forbidden from "../pages/forbidden/Forbidden"


export const PrivateRoute = ({ component: Component, canAccess, ...rest }) => {
  const history = useHistory()

  // Add your own authentication on the below line.
  const isLoggedIn = localStorage.getItem('web-token')

  
  return (
    <Route
      history={history}
      {...rest}
      render={props =>
        isLoggedIn ? (
          canAccess ? (
            <Component {...props} />
          ) : (
            <Forbidden />
          )
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}


export const GuestRoute = ({ component: Component, ...rest }) => {


  // Add your own authentication on the below line.
  const isLoggedIn = localStorage.getItem('web-token')

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
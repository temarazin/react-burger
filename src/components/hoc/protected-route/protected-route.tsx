import { useSelector } from "../../../services/hooks";
import { useState, useEffect } from "react";
import { Route, Redirect, RouteProps } from 'react-router-dom';
import Loader from "../../loader/loader";
import PropTypes from 'prop-types';

interface TProtectedRouteProps extends RouteProps {
  children: JSX.Element,
  auth?: boolean,
}

function ProtectedRoute({ children, auth = true, ...rest }: TProtectedRouteProps) {
  const { isAuth, authChecked } = useSelector((store: any) => store.user);
  const [canProceed, setCanProceed] = useState<boolean>(authChecked);

  useEffect(() => {
    setCanProceed(authChecked)
  }, [authChecked])

  if (canProceed) {
    if (auth) {
      return (
        <Route
          {...rest}
          render={() => isAuth
            ? (children)
            : (<Redirect to="/login" />)
          }
        />
      )
    } else {
      return (
        <Route
          {...rest}
          render={() => !isAuth
            ? (children)
            : (<Redirect to="/" />)
          }
        />
      )
    }

  }

  return (<Loader extraClass="mt-20" />);
}

ProtectedRoute.propType = {
  auth: PropTypes.bool,
}

export default ProtectedRoute;

import { useSelector } from "../../../services/hooks";
import { Route, Redirect, RouteProps } from 'react-router-dom';
import Loader from "../../loader/loader";
import PropTypes from 'prop-types';

interface TProtectedRouteProps extends RouteProps {
  children: JSX.Element,
  auth?: boolean,
}

function ProtectedRoute({ children, auth = true, ...rest }: TProtectedRouteProps) {
  const { isAuth, authChecked } = useSelector((store) => store.user);

  if (authChecked) {
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

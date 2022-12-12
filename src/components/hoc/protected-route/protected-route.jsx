import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';
import Loader from "../../loader/loader";
import PropTypes from 'prop-types';

function ProtectedRoute({ children, auth = true, ...rest }) {
  const { isAuth, authChecked } = useSelector(store => store.user);
  const [canProceed, setCanProceed] = useState(authChecked);

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

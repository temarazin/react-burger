import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ children, ...rest }) {
  const { isAuth, authChecked } = useSelector(store => store.user);
  const [canProceed, setCanProceed] = useState(authChecked);

  useEffect(() => {
    setCanProceed(authChecked)
  }, [authChecked])

  if (canProceed) {
    return (
      <Route
        {...rest}
        render={() => isAuth
          ? (children)
          : (<Redirect to="/login" />)
        }
      />
    )
  }

  return (<></>);
}

export default ProtectedRoute;

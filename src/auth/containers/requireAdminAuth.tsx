import React, { useEffect } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

import history from '../../history';
import { verifyToken } from '../authActions';

const withAdminAuth = (Component: React.FC) => (props: { [key: string]: any }) => {
  const { authenticated, verify, redirectHome, isAdmin } = props;

  useEffect(() => {
    // check if authenticated, if not, then verify the token
    if (!authenticated) {
      // using then here because state doesn't update in right order
      verify()(history.location.search, history.location.pathname)
        .then((data: { [key: string]: any }) => {
          if (!data.admin) {
            // if not an admin, redirect
            redirectHome();
          }
        })
        .catch(() => {});
    } else if (!isAdmin) {
      // if not an admin, redirect
      redirectHome();
    }
  }, [authenticated, isAdmin, verify, redirectHome]);

  // TODO: Make redirecting screen and return that if not authenticated.
  return <Component />;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  authenticated: state.auth.authenticated,
  isAdmin: state.auth.admin,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  redirectHome: () => {
    history.replace('/');
  },
  verify: () => {
    return verifyToken(dispatch);
  },
});
const requireAdminAuth = compose<React.FC>(connect(mapStateToProps, mapDispatchToProps), withAdminAuth);

export default requireAdminAuth;

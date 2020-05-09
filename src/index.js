import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import KonamiCode from 'konami-code';
import ReactGA from 'react-ga';
import BreadPage from './containers/egg/BreadPage/index';

import ReactGA from 'react-ga';

import configureStore, { history } from './store';

import './styles/reset.less';
import AboutPage from './containers/AboutPage';

/* Admin Container Pages */
import AdminPage from './containers/AdminPage';
import AwardPointsPage from './containers/admin/AwardPointsPage';
import EditEventPage from './containers/admin/EditEventPage';
import CreateEventPage from './containers/admin/CreateEventPage';

import AuthPage from './containers/AuthPage';
import HomePage from './containers/HomePage';
import LeaderPage from './containers/LeaderPage';
import LoginPage from './containers/LoginPage';
import PasswordPage from './containers/PasswordPage';
import ResetPage from './containers/ResetPage';
import ProfilePage from './containers/ProfilePage';
import ProfileUpdatePage from './containers/ProfileUpdatePage';
import RegisterPage from './containers/RegisterPage';
import StorePage from './containers/StorePage';
import ErrorPage from './containers/ErrorPage';
import EmailVerficationPage from './containers/EmailVerificationPage';
import ResendEmailVerificationPage from './containers/ResendEmailVerificationPage';
import requireAuth from './containers/requireAuth';
import requireAdminAuth from './containers/requireAdminAuth';
import requireStandardAccess from './containers/requireStandardAccess';

const store = configureStore();

const App = () => {
  const konami = new KonamiCode();
  const [easterEggState, setEasterEggState] = useState('');
  konami.listen(() => {
    setEasterEggState('secret bread');
    history.push('/secret-bread');
  });
  ReactGA.initialize('UA-165975388-1');
  ReactGA.pageview('/');
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/about" component={requireAuth(AboutPage)} />
            <Route
              exact
              path="/admin"
              component={requireAdminAuth(AdminPage)}
            />
            <Route
              exact
              path="/admin/editEvent/:uuid"
              component={requireAdminAuth(EditEventPage)}
            />
            <Route
              exact
              path="/admin/awardPoints"
              component={requireAdminAuth(AwardPointsPage)}
            />
            <Route
              exact
              path="/admin/createEvent"
              component={requireAdminAuth(CreateEventPage)}
            />
            <Route exact path="/authenticate-email" component={AuthPage} />
            <Route exact path="/forgot-password" component={PasswordPage} />
            <Route
              exact
              path="/leaderboard"
              component={requireAuth(LeaderPage)}
            />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/profile" component={requireAuth(ProfilePage)} />
            <Route
              exact
              path="/profile/:uuid"
              component={requireAuth(ProfilePage)}
            />
            <Route
              exact
              path="/editProfile"
              component={requireAuth(ProfileUpdatePage)}
            />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/resetPassword/:code" component={ResetPage} />
            <Route
              exact
              path="/store"
              component={requireStandardAccess(requireAuth(StorePage))}
            />
            <Route
              exact
              path="/verifyEmail/:code"
              component={EmailVerficationPage}
            />
            <Route
              exact
              path="/resendEmailVerification"
              component={requireAuth(ResendEmailVerificationPage)}
            />
            <Route
              exact
              path="/secret-bread"
              component={() => {
                if (easterEggState === 'secret bread') {
                  return <BreadPage />;
                }
                return <Redirect to="/login" />;
              }}
            />
            <Route path="/" component={requireAuth(HomePage)} />
            <Route path="/" component={ErrorPage} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

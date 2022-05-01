import React from 'react';
import { connect } from 'react-redux';
import withSizes from 'react-sizes';
import { ThunkActionCreator } from '../../../auth/authTypes';

import CheckInModal from '../../../event/containers/CheckInModal';
import Header from '../Header';
import NavBarHorizontal from '../NavBarHorizontal';
import NavBarVertical from '../NavBarVertical';

import { logoutUser } from '../../../auth/authActions';

import './style.less';

interface PageLayoutProps {
  children: React.ComponentClass | React.FC;
  hasAdminAccess: boolean;
  hasStoreAdminAccess: boolean;
  isMobile: boolean;
  logout: Function;
}

const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const { children, hasAdminAccess, hasStoreAdminAccess, isMobile, logout } = props;

  return (
    <>
      <CheckInModal />
      <Header />
      {isMobile ? (
        <>
          <NavBarHorizontal hasAdminAccess={hasAdminAccess} />
          <div className="page-layout-content">{children}</div>
        </>
      ) : (
        <div className="page-layout-content-table">
          <NavBarVertical hasAdminAccess={hasAdminAccess} hasStoreAdminAccess={hasStoreAdminAccess} logout={logout} />
          <div className="page-layout-content">{children}</div>
        </div>
      )}
    </>
  );
};

const mapSizesToProps = ({ width }: { width: number }) => ({
  isMobile: width <= 768,
});

const mapDispatchToProps = (dispatch: ThunkActionCreator) => ({
  logout: () => {
    dispatch(logoutUser());
  },
});

export default withSizes(mapSizesToProps)(connect(null, mapDispatchToProps)(PageLayout) as any) as any; // TODO

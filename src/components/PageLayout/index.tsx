import React, { ComponentType } from 'react';
import withSizes from 'react-sizes';
import { NavLink } from 'react-router-dom';

import CheckInModal from '../../containers/CheckInModal';
import NavDropdown from '../../containers/NavDropdown';
import NavProfile from '../../containers/NavProfile';
import NavBarHorizontal from '../NavBarHorizontal';
import NavBarVertical from '../NavBarVertical';

import logo from '../../assets/graphics/logo.svg';

import './style.less';

interface PageLayoutProps {
  children: React.ComponentClass | React.FC;
  isAdmin: boolean;
  isMobile: boolean;
  authenticated: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const { children, isAdmin, isMobile, authenticated } = props;

  return (
    <>
      <CheckInModal />
      <div className="header">
        <NavLink className="title" to="/">
          <img alt="ACM" id="logo" src={logo} />
          <span className={isMobile ? 'hidden' : 'subheading'}>&nbsp;Membership Portal</span>
        </NavLink>
        {authenticated && (
          <div className="profile">
            <NavProfile menu={<NavDropdown />} />
          </div>
        )}
      </div>
      <div className="wainbow" />
      {isMobile ? (
        <>
          <NavBarHorizontal />
          <div className="content">{children}</div>
        </>
      ) : (
        <div className="content-table">
          <NavBarVertical isAdmin={isAdmin} />
          <div className="content">{children}</div>
        </div>
      )}
    </>
  );
};

const mapSizesToProps = ({ width }: { width: number }) => ({
  isMobile: width < 768,
});

export default withSizes(mapSizesToProps)(PageLayout as ComponentType<{ isMobile: boolean }>);

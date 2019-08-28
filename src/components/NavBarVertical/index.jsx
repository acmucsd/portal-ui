import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.less';
import NavListItem from '../NavListItem';
import { ReactComponent as ACMIcon } from '../../assets/icons/acm-icon.svg';
import { ReactComponent as DashboardIcon } from '../../assets/icons/dashboard-icon.svg';
import { ReactComponent as DiscordIcon } from '../../assets/icons/discord-icon.svg';
import { ReactComponent as LBIcon } from '../../assets/icons/lb-icon.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile-icon.svg';
import { ReactComponent as SwagIcon } from '../../assets/icons/swag-icon.svg';

export default () => {
  return (
    <nav className="navbar-vertical">
      <section>
        <h1>Portal</h1>
        <NavLink activeClassName="selected" to="/">
          <NavListItem icon={DashboardIcon} link="/" text="Dashboard" />
        </NavLink>
        <NavLink activeClassName="selected" to="/leaderboard">
          <NavListItem icon={LBIcon} text="Leaderboard" />
        </NavLink>
        <NavLink activeClassName="selected" to="/profile">
          <NavListItem icon={ProfileIcon} text="Profile" />
        </NavLink>
      </section>

      <section>
        <h1>ACM</h1>
        <NavLink activeClassName="selected" to="/about">
          <NavListItem icon={ACMIcon} text="About ACM" />
        </NavLink>
        <NavLink activeClassName="selected" to="/store">
          <NavListItem icon={SwagIcon} text="ACM Store" />
        </NavLink>
        <a href="https://discord.gg/mK9Zrf4d">
          <NavListItem icon={DiscordIcon} text="Discord" />
        </a>
      </section>
    </nav>
  );
***REMOVED***

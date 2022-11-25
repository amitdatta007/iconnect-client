import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavItem.css';

const NavItem = ({path, name}) => {
    return (
        <NavLink to={path} className={`${(isActive) => isActive ? 'active' : null} font-medium hover:text-primary`}>{name}</NavLink>
    );
};

export default NavItem;
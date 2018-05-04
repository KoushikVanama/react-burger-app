import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>        
    </ul>
)

export default navigationItems;
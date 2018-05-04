import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink activeClassName={classes.active} exact={props.exact} to={props.link}>{props.children}</NavLink>
    </li>
        /*This was similar to line 8.
        <a href={props.link} className={props.active ? classes.active : null}>{props.children}</a>*/
)

export default navigationItem;
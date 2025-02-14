import React from 'react';
import {Link} from "react-router-dom";

const NavItem = ({children, ...props}) => {
    return (
        <Link to={props.to}  className={props.classes.nav_item}>
                {props.icon? props.icon : ''}
                <p className={props.classes.nav_item_text}>{props.text}</p>
        </Link>
    );
};

export default NavItem;
import React, {useMemo, useState} from 'react';
import classes from "./NavBar.module.css";
import Button from "../Button/Button";
import { ReactComponent as MenuIcon }  from "assets/icons/menu.svg";
import { ReactComponent as FirmaIcon }  from "assets/icons/firm.svg";
import NavItem from "Components/UI/NavBar/NavItem";
const NavBar = ({children,...props}) => {

    const [isOpen, setIsOpen] = useState(classes.open);

    const menuButton = () => {
        isOpen === classes.open ? setIsOpen(classes.close) : setIsOpen(classes.open);
        console.log(isOpen);
    }
    return (
        <nav className={`${classes.navbar} ${isOpen} `}>
            <Button className={classes.menu_button} onClick={menuButton}>
                <MenuIcon/>
            </Button>
            <NavItem classes={classes} to='/companies' icon={<FirmaIcon />} text="Companies" />
        </nav>
    );
};

export default NavBar;
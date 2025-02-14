import React from 'react';
import NavBar from "../NavBar/NavBar";
import classes from "./Layout.module.css";


const Layout = ({children, ...props}) => {
    return (
        <div className={classes.layout}>
            <NavBar></NavBar>
            <main className={classes.main}>{children}</main>
        </div>
    );
};

export default Layout;
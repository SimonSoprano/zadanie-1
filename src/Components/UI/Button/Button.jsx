import React from 'react';
import classes from "./Button.module.css";
const Button = ({children, ...props}) => {
    return (
        <button onClick={props.onClick} className={classes.btn} {...props} >{children}</button>
    );
}

export default Button;
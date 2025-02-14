import React from 'react';
import classes from './Input.module.css';
const Input = (props) => {
    return (
        <div className={classes.inputContainer} style={props.type === 'checkbox' ? {width:"fit-content"} : {}}>
            <input id={props.name} {...props} className={classes.input}/>
            <label htmlFor={props.label} className={classes.label}>{props.label? props.placeholder : ''}</label>
        </div>

    );
};

export default Input;
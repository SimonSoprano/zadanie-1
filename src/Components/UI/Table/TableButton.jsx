import React, {Component} from 'react';
import defaultClasses from "./Table.module.css";
const TableButton = ({children,...props}) => {
    return (
        <button {...props} onClick={props.onClick} className={defaultClasses.t_button}>
            {children}
        </button>
    );
};

export default TableButton;
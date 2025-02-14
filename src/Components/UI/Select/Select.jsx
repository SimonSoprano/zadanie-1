import React from 'react';
import classes from "./Select.module.css";
const Select = ({ defaultValue, options, value, onChange }) => {
    return (
        <div className={classes.wrapper }>
            <select className={classes.select }
                    onChange={onChange}
                    value={value}>

                <option className={classes.option_default }
                        disabled={true} value="">{defaultValue}</option>
                {options.map((row,index) => (
                    <option className={classes.option } key={index} value={row.id}>{row.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;
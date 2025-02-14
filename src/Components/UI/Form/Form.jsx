import React, { useState } from 'react';
import classes from "./Form.module.css";

const Form = ({name, children, onSubmit, message , ...props }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formData);
    };


    const enhancedChildren = React.Children.map(children, child => {
        if (React.isValidElement(child) && (child.type === 'input' || child.type === 'select' || child.type === 'textarea')) {
            return React.cloneElement(child, {
                onChange: handleChange,
                value: formData[child.props.name] || '',
            });
        }
        return child;
    });

    return (
        <>
            <p className={classes.name} >{name}</p>
            <form {...props} onSubmit={handleSubmit} className={classes.form}>
                {enhancedChildren}
                {message ? <p style={{width:'100%',color:'red'}}>{message}</p> : null}
            </form>
        </>

    );
};

export default Form;

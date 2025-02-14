import React, {Component, memo, useMemo} from 'react';
import defaultClasses from "./Table.module.css";
import TableButton from "Components/UI/Table/TableButton";

const Table = ({callback ,loading, lang, libraries, ...props}) => {
    const classes = props.classes ? props.classes : defaultClasses;
    //tworzenie kolumn na podstawie danych z pierwszego elementu
    const columns = props.data && props.data.length >0? Object.keys(props.data[0] ) : [];


    const libririesProcessing = (row,field) => {
        if(libraries &&  libraries[field]){
            return libraries[field][row[field]];
        }
        return  formatValue(row[field]);

    }
    const formatValue = (value) => {
        if(typeof value === "string"){
            return value;
        }
        return value.toString();
    }


    return (
        <div className={classes.container} >
            <table className={classes.table}>
                <thead className={classes.thead}>
                <tr className={classes.head_tr}>
                    <th  className={classes.th}></th>
                    {columns.map((column, index) =>
                        <th key={index} className={classes.th}>

                            {   // podmieniamy po nazwie kluczy z kolumn i dostajemy z listy lang wartość
                                lang && lang[column] ? lang[column] : column
                            }
                        </th>
                    )}
                </tr>
                </thead>
                <tbody className={classes.tbody}>
                    {props.data && props.data.length > 0 ? props.data.map((row,index) => (
                        <tr key={row.id} className={classes.body_tr}>
                                <td className={classes.td}>
                                    {index+1}
                                </td>
                            {columns.map((field) => (
                                <td key={field} className={classes.td}>
                                    {
                                        libririesProcessing(row,field)
                                    }
                                </td>
                            ))}
                            {props.buttons ?
                                <td>
                                    {props.buttons.map((button, index) =>(
                                    <TableButton key={index}  onClick={() => button.callback(row.id)}>
                                        {button.icon}
                                    </TableButton>
                                    ))}
                                </td>
                                :
                                 ''
                            }
                        </tr>
                    )):
                        //jesli laduje sie to pokazujemy komunikat jesli lista pusta i sie nie laduje to pokazujemy inny komunikat
                        loading ? <tr><td>loading...</td></tr>  : <tr><td>Niema zadnego zapisu</td></tr>
                    }
                </tbody>
            </table>

        </div>
    );
};

export default Table;
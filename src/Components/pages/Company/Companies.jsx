import React, {useEffect, useMemo, useState} from 'react';

import Table from "Components/UI/Table/Table";
import Layout from "Components/UI/Layout/Layout";
import CompanyForm from "./CompanyForm";
import Input from "../../UI/Input/Input";

import LocalStorageService from "../../../services/LocalStorageService";
import {ReactComponent as DeleteIcon} from "assets/icons/delete.svg";


const tableName = "companies";

const Companies = () => {
    /*
        Clasa
        słuzaca - reprezentacji strony z firmami z mozliwosca dodania firm
        wykorzystywana - w router jako endpoint z /companies
     */
    const [companies, setCompanies] = useState([]);

    const [filter, setFilter] = useState(false);

    const [loading, setLoading] = useState(false);

    const lang = {
        id:'Id',
        name:'Nazwa',
        area:'Profil',
        isActive: 'Aktywna',
        city:'Miasto',
        postCode:'Kod pocztowy',
        companyCode:'Kod firmy',
        street:'Ulica',
        email:'Email' };

    const libraries = {
        isActive:{
           true: 'Aktywna' ,
           false:  'Nieaktywna'
        },
        area:{
            1: 'Mała' ,
            2:  'Średnia',
            3:  'Duża'
        } };

    const getPosts = async () => {
        setLoading(true);
        LocalStorageService.getAll(tableName).then((data) => {
            setCompanies(data);
            setLoading(false);
        })
    };

    useEffect(() => {
        filterPosts();
    },[filter])

    const filterPosts = () => {
        setLoading(true);
        LocalStorageService.getAll(tableName).then((data) => {
            setCompanies( data ? data.filter(it => filter === it.isActive) : [] );
            setLoading(false);
        })


    }

    const deleteById=(id)=>{
        console.log("delete id:"+id);
        LocalStorageService.removeItem(tableName,id).then(
            (list) => {
                getPosts();
            }
        )
    }
    const tableButtons = [
        { id: 'delete', icon: <DeleteIcon />, callback: deleteById },
    ];


    useEffect(() => {
        getPosts();
    }, []);

    return (
        <Layout>

            <CompanyForm tableName={tableName} onRefresh={getPosts}/>
            <Input onChange={e => setFilter(e.target.checked)} type={"checkbox"} name={'filter'} checked={filter}
                   label={'filter'} placeholder={"Tylko aktywne firmy"}  />
            <Table data={companies} buttons={tableButtons} lang={lang}  loading={loading} libraries={libraries} />
        </Layout>
    );
};

export default Companies;
import React, {useEffect, useState} from 'react';
import Form from "Components/UI/Form/Form";
import Input from "Components/UI/Input/Input";
import Select from "Components/UI/Select/Select";
import Button from "Components/UI/Button/Button";
import {CompanyValidator} from "../../../ModelsDTO/Company/CompanyValidator";
import LocalStorageService from "../../../services/LocalStorageService";

const CompanyForm = ({tableName,onRefresh}) => {
    /*
      Komponent
      słuzący - do manipulacji z danymi modelu'Company' oraz interakcji z uzytkownikiem
      wykorzystywana - w warstwie Strony
   */
    const [formMessage, setFormMessage] = useState('');
    const [company,setCompany] = useState({
        id:0,
        name:'',
        area:0,
        isActive: false,
        city:'',
        postCode:'',
        companyCode:0,
        street:'',
        email:'' });
    const clearCompany = {
        id:0,
        name:'',
        area:0,
        isActive: false,
        city:'',
        postCode:'',
        companyCode:0,
        street:'',
        email:'' };

    const generateCompanyCode = () => {
        LocalStorageService.generateCompanyCode().then(res => {
            setCompany({...company, companyCode : res} );
        }).catch(err => {
            setFormMessage(err.message);
        });
    }

    const addCompany = () => {

        CompanyValidator.validate(company)
            .then(()=>{
                LocalStorageService.setItem(tableName, company).then(
                    (list) => {
                        onRefresh();
                    }
                );
                setFormMessage('');
                setCompany(clearCompany);
            })
            .catch((err) => {
                console.error(err.message);
                setFormMessage(err.message);
            })


    }

    return (
        <>
            <Form onSubmit={addCompany} message={formMessage} name={'Dodaj nową firme:'} >
                <Input type={"text"} name={"name"} value={company.name}
                       placeholder={'Nazwa..'}
                       onChange={(e) => setCompany( {...company, name : e.target.value})} />
                <Input type={"text"} name={"email"} value={company.email}
                       placeholder={'Email..'}
                       onChange={(e) => setCompany( {...company, email : e.target.value})}/>
                <Input type={"text"} name={"city"} value={company.city}
                       placeholder={'Miasto..'}
                       onChange={(e) => setCompany( {...company, city : e.target.value})}/>
                <Input type={"text"} name={"postCode"} value={company.postCode}
                       placeholder={'00-000 kod pocztowy'}
                       onChange={(e) => setCompany( {...company, postCode : e.target.value})}/>
                <Input type={"text"} name={"street"}  value={company.street}
                       placeholder={'Ulica..'}
                       onChange={(e) => setCompany( {...company, street : e.target.value})}/>
                <Select defaultValue={"Wybierż profil"} name={"area"} value={company.area}
                        onChange={(e) => setCompany( {...company, area : e.target.value})}
                        options={  [ {id: 1, name: "Mała"} , //do selektu sa dodane przykładowe dane
                            {id: 2, name: "Średnia"},
                            {id: 3, name: "Duża" } ] }/>
                <div style={{display: "flex",flexDirection: "row"}}>
                    <Input type={"number"} name={"companyCode"} value={company.companyCode}
                           style={{width: "100px",maxWidth: "100px"}}
                           placeholder={'Kod 0000'} disabled={true}/>
                    <Button type={'button'} onClick={e => generateCompanyCode()}
                            style={{marginInline:'25px'}} >
                        Generuj kod firmy
                    </Button>
                </div>

                <Input type={"checkbox"} name={"isActive"} checked={company.isActive} label={"isActive"}
                       placeholder={'Firma Aktywna'}
                       onChange={(e) => setCompany( {...company, isActive : e.target.checked})}/>
                <Button type={"submit"}  >
                    Dodaj
                </Button>
            </Form>
        </>
    );
};

export default CompanyForm;

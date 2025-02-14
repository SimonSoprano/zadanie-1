export class CompanyValidator{

    /*
        Clasa
        słuzaca - do validacji modelu 'Company'
        wykorzystywana - w warstwie po submicie formy
     */

     static async validate(company) {
         if( !this.isValidName(company.name) ){
             throw new Error("Nie poprawna nazwa");
         }
         if( !this.isValidEmail(company.email) ){
             throw new Error("Nie poprawny email");
         }
         if( !this.isValidPostCode(company.postCode) ){
             throw new Error("Nie poprawny kod pocztowy");
         }
         if( !this.isValidCompanyCode(company.companyCode) ){
             throw new Error("Nie poprawny kod firmy");
         }
         return true;

     }
    static isValidCompanyCode(code){
        console.log("in validator post code"+code + " leng :"+code.toString().trim().length );
        console.log((code &&
            typeof code === "number" &&
            code.toString().trim().length === 4))
        return code &&
               typeof code === "number" &&
               code.toString().trim().length === 4;
    }
    static isValidPostCode(code){
        return code &&
            typeof code === "string" &&
            code.includes("-") &&
            code.toString().trim().length === 6;
    }

     static isValidName(name){
         return !(!name || name.trim().length === 0);
     }
    static isValidEmail(email){
        return typeof email === "string" &&
            email.trim().length > 0 &&
            email.indexOf("@") > 0 &&
            (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    }
}
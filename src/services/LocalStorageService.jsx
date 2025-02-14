import {LocalStorageRepository} from "../repositories/LocalStorageRepository";

export default class LocalStorageService  {
    /*
          Clasa
          słuzaca - do pozyskiwania danych z local storage i zapisywania
          wykorzystywana - w warstwie zapisu danych oraz oczytu czyli w formie oraz w reprezentacji strony z danymi
     */
    static async generateCompanyCode () {
        return await this.createValidCode(4);
    }
    static async createValidCode(length){

        let res = '';
        do {
            res = '';
            while (res.length < length){
                res = res.toString() + Math.floor(Math.random() *10).toString();
            }
        }while ( await this.getItemByCode('companies',res)  !== null)

        return Number.parseInt(res.trim());
    }

    static async setItem (table, object)  {
        try {
            object['id'] = this.generateId();
            let list =  await LocalStorageRepository.getItem(table)?? [];
            if(list.includes(object.id)){
                return new Error(`Object from table: ${table} with id: ${object.id} exists!`);
            }
            list.push(object);
            await LocalStorageRepository.setItem(table, list );
            localStorage.setItem("db_last_id",object.id);

        } catch (error) {
            console.error("Błąd zapisu do LocalStorage! ", error);
        }
    }


    static async getItem (table, key) {
        try {
            let list = await LocalStorageRepository.getItem(table);
            return list.find(item => item.id === key)??null;
        } catch (error) {
            console.error("Błąd odczytu z LocalStorage! ", error);
            return null;
        }
    }

    static async getItemByCode (table, key) {
            try {
                let list = await LocalStorageRepository.getItem(table);
                return list.find(item => item.companyCode === key)??null;
            } catch (error) {
                console.error("Błąd odczytu z LocalStorage! ", error);
                return null;
            }
        }


    static async removeItem (table,key) {
        try {
            let list = await LocalStorageRepository.getItem(table);
            await LocalStorageRepository.setItem(table, list.filter(item => item.id !== key));
        } catch (error) {
            console.error("Błąd usuwania z LocalStorage! ", error);
        }
    }


    static async getAll(table) {
        try {
            return  LocalStorageRepository.getItem(table);
        } catch (error) {
            console.error("Błąd czyszczenia LocalStorage! ", error);
        }
    }

    static generateId(){
        let res =  LocalStorageRepository.getLastId();
        res = res + 1 ;
        return  res;
    }
}


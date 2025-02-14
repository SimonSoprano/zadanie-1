
export  class LocalStorageRepository {
    static async setItem (key, value)  {
        try {
            await localStorage.setItem(  key , JSON.stringify(value));
        } catch (error) {
            console.error("Błąd zapisu do LocalStorage", error);
        }
    }


    static async getItem (key) {
        try {
            const item =  localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error("Błąd odczytu z LocalStorage", error);
            return null;
        }
    }


    static async removeItem (key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Błąd usuwania z LocalStorage", error);
        }
    }


    static async clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Błąd czyszczenia LocalStorage", error);
        }
    }
    static getLastId() {
        let lastId = localStorage.getItem('db_last_id');
        if(lastId){
            return  Number.parseInt(lastId);
        }else{
            localStorage.setItem("db_last_id",'0')
            return 0;
        }
    }

}

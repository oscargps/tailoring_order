
export class StorageHelper {

    static get(key: string) {

        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        } else {
            return false
        }

    }
    static remove(key: string) {

        const data = localStorage.getItem(key);
        if (data) {
            return localStorage.removeItem(key);
        } else {
            return false
        }

    }

    static save(key: string, data: any) {
        const dataToSave = JSON.stringify(data);
        localStorage.setItem(key, dataToSave);
    }

    static clear() {
        localStorage.clear();
    }

}
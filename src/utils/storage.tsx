import { LOCAL_STORE_PREFIX } from 'utils/constants';

export default class Storage {
    static prefix: string = LOCAL_STORE_PREFIX;

    static getItem(name: string) {
        return JSON.parse(localStorage.getItem(this.prefix + name) || 'null');
    }

    static setItem(name: string, value: any) {
        localStorage.setItem(this.prefix + name, JSON.stringify(value));
    }

    static removeItem(name: string) {
        return localStorage.removeItem(this.prefix + name);
    }
}




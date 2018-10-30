import nodeLocalstorage from 'node-localstorage';
import { IsessionDataService } from '../interfaces/sessionDataService';

export class LocalStorageService implements IsessionDataService {

    private readonly localStorage: nodeLocalstorage.LocalStorage;

    public constructor() {
        this.localStorage = new nodeLocalstorage.LocalStorage('../data');
    }

    public read(key: string): string {
        if (!key) {
            throw new Error('Invalid key, please try again');
        }
        const value: string | null = this.localStorage.getItem(key);
        if (value === null) {
            throw new Error('Value is null');
        }

        return value;
    }
    public write(key: string, value: string): void {
        if (!key) {
            throw new Error('Invalid key, please try again');
        }
        if (!value) {
            throw new Error('Invalid value, please try again');
        }
        this.localStorage.setItem(key, value);
    }
}

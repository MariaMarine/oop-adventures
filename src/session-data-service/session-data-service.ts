import { IsessionDataService } from './interfaces/sessionDataService';

export class SessionDataService implements IsessionDataService {
    private readonly service: IsessionDataService;
    constructor(service: IsessionDataService) {
        this.service = service;
    }
    public read(key: string): string {
        if (!key) {
            throw new Error('Invalid key, please try again');
        }

        return this.service.read(key);
    }
    public write(key: string, value: string): void {
        if (!key) {
            throw new Error('Invalid key, please try again');
        }
        this.service.write(key, value);
    }

}

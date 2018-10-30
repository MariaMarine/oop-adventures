export interface IsessionDataService {
    read(key: string): string;
    write(key: string, value: string): void;
}

import { Iparser } from '../interfaces/parser';

export class TestParser implements Iparser {
    public parse(input: string): string {
        return input.concat('HAHAHAHAHAH');
    }
}

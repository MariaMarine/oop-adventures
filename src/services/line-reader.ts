import * as readline from 'readline';

export class LineReader {
    private rl: any = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    public nextQuery(queryText: string, possibleInputValues?: string[], extendedQuery?: boolean): string {

       return this.rl.question(queryText, (input: string) => {
            if (possibleInputValues) {
                let userValueIsPossible: boolean = false;
                possibleInputValues.forEach((value: string, index: number) => {
                    if (input === value || +input === index + 1 && extendedQuery) {
                        userValueIsPossible = true;
                        if (+input === index + 1) {
                            return possibleInputValues[index + 1];
                        } else {
                            return input;
                        }

                  }
                });

                if (!userValueIsPossible) {
                    if (!extendedQuery) {
                        let newTextForQuery: string = queryText.concat(`\n\n Possible options: \n`);

                        possibleInputValues.forEach((value: string, index: number) => {
                            newTextForQuery += `${index + 1}) ${value}\n`;
                        });
                        this.nextQuery(newTextForQuery, possibleInputValues, true);
                    } else {
                        this.nextQuery('Ivalid input\n', possibleInputValues, true);
                    }
                }

            } else {

                // validation needed
                return input;
            }

        });

    }
}

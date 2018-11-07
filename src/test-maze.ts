import { Randomizer } from './factory/randomizer';
import { IPlace } from './models/non-living/interfaces/place';
import { Place } from './models/non-living/classes/place';

// tslint:disable-next-line:no-any
const generator: any = require ('../node_modules/generate-maze');
const gamerows: number = 5;
const gamecols: number = 5;
const maze: {x: number; y: number; top: boolean; left: boolean;
            // tslint:disable-next-line:no-reserved-keywords
            bottom: boolean; right: boolean; set: number; place: IPlace;
        }[][]  = generator(gamerows, gamecols);

for (let i: number = 0; i < gamerows; i += 1) {
        for (let j: number = 0; j < gamecols; j += 1) {
                const cell: {x: number; y: number; top: boolean; left: boolean;
                        // tslint:disable-next-line:no-reserved-keywords
                        bottom: boolean; right: boolean; set: number; place: IPlace;
                    } = maze[j][i];
                cell.place = new Place(Randomizer.GENERATEDIFFICULTYCOEF(i, j));
                console.log(i, j, cell.place.loot.coins);
        }
    }

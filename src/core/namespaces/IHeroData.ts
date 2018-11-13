import { Ihero } from './../../models/living/interfaces/hero';
export interface IHeroData {
    getHeroData(name: string): Ihero;
}

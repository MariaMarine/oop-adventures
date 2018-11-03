import { IPlace } from './../interfaces/place';
import { IMap } from './../interfaces/map';

abstract class PlaceMap implements IMap <IPlace>  {
    public abstract map: IPlace[][];
}

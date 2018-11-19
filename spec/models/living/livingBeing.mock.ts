import { LivingBeingModel } from '../../../src/models/living/classes/livingBeing-model';

export class LivingBeingMock extends LivingBeingModel {
    public say(): string {
      return 'LivingBeingMock.say()';
    }
  }

// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { Init } from './core/init';
import { container } from './ioc-config/ioc.config';
import { TYPES } from './ioc-config/types';

// Write your code here
const init: Init = container.get<Init>(TYPES.init);

init.initialize();

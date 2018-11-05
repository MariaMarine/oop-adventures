// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { Init } from './core/init';
import { container } from './ioc-config/ioc.config';

// Write your code here
const init: Init = container.get<Init>('init');

init.initialize();

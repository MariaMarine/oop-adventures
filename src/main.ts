import { MainEngine } from './core/engine';
import { Iparser } from './core/UI/interfaces/parser';
import { Ireader } from './core/UI/interfaces/reader';
import { Iwriter } from './core/UI/interfaces/writer';
import { TestParser } from './core/UI/parsers/parser';
import { ConsoleReader } from './core/UI/readers/console-reader';
import { ConsoleWriter } from './core/UI/writers/console-writer';

// Write your code here

console.log(__dirname);

const parser: Iparser = new TestParser();
const writer: Iwriter = new ConsoleWriter();
const reader: Ireader = new ConsoleReader();

const ui: MainEngine = new MainEngine(reader, writer, parser);

ui.start();

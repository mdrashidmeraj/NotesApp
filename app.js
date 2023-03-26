// const fs = require('fs');
// fs.writeFileSync('note.txt', 'This file is created by node js. ');
// fs.appendFileSync('note.txt', 'Hello everyone');
// const sum = require('./utils.js');
// const myname = 'Rashid';
// console.log(myname);
// console.log(sum(1,2));

// import chalk from 'chalk';
// import validator from 'validator'
// import {getNotes} from "./notes.js";
// console.log(getNotes());
// console.log(validator.isEmail('foo@bar.com'))
// console.log(chalk.green.bold.inverse('Sucess'));


import {getAllNotes, addNote, removeNote, getDescription} from './notes.js'
import yargs from 'yargs'


// yargs.version('1.1.0')
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe : "Note title",
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body)

    }
})

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe : "Note title",
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        removeNote(argv.title);
    }
})

yargs.command({
    command: 'list',
    describe: 'list all note',
    handler () {
        getAllNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'reading a note',
    builder: {
        title: {
            describe : "Note title",
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        getDescription(argv.title);
    }
})
yargs.parse()
console.log(yargs.argv)

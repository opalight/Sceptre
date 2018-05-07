#!/usr/bin/env node

'use strict';

const inquirer = require('inquirer');
const minimist = require('minimist');
const questions = require('../src/questions');
const hera = require('../index');
// const knowledge = require('../src/knowledge');

const emailQuestions = questions.email;

// Init
const Hera = new hera();

let args = {
    boolean: ['lyrics', 'shrug', 'mail', 'knowledge'],
    alias: { h: 'help', v: 'version' },
    stopEarly: true,
    unknown() { console.log('Unknown command') }
};
let argv = minimist(process.argv.slice(2), args);

if (argv.mail) {
    // Send Email
    inquirer.prompt(emailQuestions).then(input => {
        Hera.Mail(input.recipient, input.subject, input.message, input.password);
    });
}
if (argv.shrug) { Hera.Shrug(); }

if (argv.lyrics) {
    let songArgs = []
    let splitStr = argv._.toString().includes('by') ? 'by' : '-';

    argv._.toString().split(splitStr).forEach(el => {
        songArgs.push(el.toString().replace(/,/g, ' ').trim());
    });
    Hera.Lyrics(songArgs[0], songArgs[1]);
}

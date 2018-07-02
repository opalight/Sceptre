#!/usr/bin/env node

/**
 * Copyright (c) 2018 Collin Grimm
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use strict';

const inquirer = require('inquirer');
const program = require('commander');

const hera = require('../index');
const questions = require('../src/questions');

const emailQuestions = questions.email;

// Init
const Hera = new hera();

const Runner = {
    lyrics: (song) => {
        song = song.filter((el) => { return typeof el === 'string' })
        let [songName, artist] = song.toString().split('-');

        songName = songName.split(',').join('');
        artist = artist.split(',').join('');
        return Hera.Lyrics(songName, artist);
    },
    mail: () => {
        // Send Email
        inquirer.prompt(emailQuestions).then(input => {
            Hera.Mail(input.recipient, input.subject, input.message, input.password);
        });
    }
}

program
    .command('lyrics')
    .alias('ly')
    .action((...song) => {
        Runner.lyrics(song);
    });
program
    .command('mail')
    .action((arg) => {
        Runner.mail(arg);
    })

program.parse(process.argv);

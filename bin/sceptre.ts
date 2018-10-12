#!/usr/bin/env node

/**
 * Copyright (c) 2018 Collin Grimm
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/// <reference path="../sceptre.d.ts" />

import inquirer from 'inquirer';
import program from 'commander';

import { Sceptre as sceptre } from '../index';
import questions from '../src/questions';


// Init
const Sceptre = new sceptre();

const Runner: Runner.Options = {
    lyrics: (song: Array<any>): void => {
        song = song.filter((el: any) => { return typeof el === 'string' })
        let [songName, artist]: Array<string> = song.toString().split('-');

        songName = songName.split(',').join('');
        artist = artist.split(',').join('');
        return Sceptre.Lyrics(songName, artist);
    },
    mail: (): void => {
        // Send Email
        inquirer.prompt(questions.email).then((input: any) => {
            Sceptre.Mail(input);
        });
    },
    tasks: (command: string): void => {
        switch (command.toString().trim()) {
            case 'list':
                Sceptre.Tasks().showAllTask();
                break;
            case 'new':
                inquirer.prompt(questions.tasks).then((input: any) => {
                    Sceptre.Tasks().newTask(input);
                });
                break;
            // FIXME
            case 'update':
                inquirer.prompt(questions.tasks).then((input: any) => {
                    Sceptre.Tasks().updateTask({ title: input.title, body: input.body, id: input.id });
                });
                break;
            case 'purge':
                Sceptre.Tasks().deleteAllTask();
            default:
                break;
        }
    },
    shrug: (): void => {
        return console.log(Sceptre.Shrug())
    }
}

program
    .command('lyrics')
    .alias('ly')
    .action((...song) => Runner.lyrics(song));
program
    .command('mail')
    .action(() => Runner.mail());
program
    .command('tasks')
    .alias('reminders')
    .action(command => Runner.tasks(command))
program
    .command('shrug')
    .alias('emote')
    .action(() => Runner.shrug())

program.parse(process.argv);

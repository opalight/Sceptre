/**
 * Copyright (c) 2018 Collin Grimm
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Mail } from './src/mail';
import { Lyrics as lyrics } from './src/lyrics';
import { quadratic as quad } from './src/quad';
import { shrug } from './src/shrug';
import { Tasks as task } from './src/tasks';

export class Hera {
    public Shrug(): void {
        return shrug();
    }
    public Quad(a: number, b: number, c: number): void {
        return quad(a, b, c);
    }
    public Mail(recipient: string, subject: string, message: string, password: string): void {
        const mailConfig = {
            recipient: recipient,
            subject: subject,
            message: message,
            password: password
        }
        return new Mail().Send(mailConfig);
    }
    Lyrics(song: string, artist: string): void {
        return new lyrics().SongLyrics({ title: song, artist: artist });
    }
    Tasks() {
        return new task();
    }
}

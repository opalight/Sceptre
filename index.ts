/**
 * Copyright (c) 2018 Collin Grimm
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import Mail from './src/mail';
import Lyrics from './src/lyrics';
import { quadratic as quad } from './src/quad';
import shrug from './src/shrug';
import Tasks from './src/tasks';

export class Hera {
    public Shrug(): void {
        return console.log(shrug);
    }
    public Quad(a: number, b: number, c: number): void {
        return console.log(quad(a, b, c));
    }
    public Mail(Params: Mailer.Options.Send): string {
        const mailConfig: Mailer.Options.Send = {
            recipient: Params.recipient,
            subject: Params.subject,
            message: Params.message,
            password: Params.password
        }
        return new Mail().Send(mailConfig);
    }
    Lyrics(song: string, artist: string): void {
        return new Lyrics().SongLyrics({ title: song, artist: artist });
    }
    Tasks() {
        return new Tasks();
    }
}
export default Hera;

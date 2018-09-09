/// <reference path="../sceptre.d.ts" />

import request from 'request';
import { load } from 'cheerio';
import * as _chalk from 'chalk';

const chalk = _chalk.default;

export class Lyrics {
    protected WhiteSpace(str: string) { return str.toString().trim(); }

    // FIXME: @param str should be a string not of type any
    protected Spacer(str: any): string {
        if (str) {
            return str.toString().toLowerCase().match(/[^_\s\W]+/g).join('');
        }
        throw new TypeError(`${str} is not of type string`);
    }

    public SongLyrics(Song: LyricsOptions.Props): any {
        Song.title = this.Spacer(Song.title);
        Song.artist = this.Spacer(Song.artist);

        const LyricURL: string = `https://www.azlyrics.com/lyrics/${Song.artist}/${Song.title}.html`;
        const googleURL: string = `https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fwww.metrolyrics.com%2F+${Song.title}+${Song.artist}`

        return request(LyricURL, (error: Error, response: any, body: CheerioElement): void => {
            let finalLyrics: Array<string> = [];

            if (error) throw new Error(error.message);
            if (response.statusCode >= 404) {
                this.Suggestions(googleURL);
                return console.log(`Lyrics not found :(\n`);
            }
            const $: CheerioStatic = load(body);
            const lyrics: Array<string> = $('.text-center').children('div').text().toString().replace(/^(\n){2,}/gm, "\r\n").split('\n');

            console.log(`"${Song.title} by ${Song.artist}"\n`);
            for (let i = 0; i < lyrics.length; i++) {
                if (lyrics[i].includes('Submit Corrections')) { break; }
                finalLyrics.push(lyrics[i]);
            }
            console.log(finalLyrics.join('\n'));
        });
    }
    protected Suggestions(url: string) {
        try {
            request(url, (error: Error, response: any, body: CheerioElement) => {
                if (response.statusCode > 400) {
                    return console.log(`Oh no :( There was an error \n${error.message}`);
                }

                const $: CheerioStatic = load(body);
                const res: string = $('.r > a').text();
                let suggestion: Array<any> = []; // FIXME: Declare a fixed type
                if (res) {
                    let googleResponse: Array<string> = res.replace(/metroLyrics|lyrics|\.\.\.|http|video|audio/ig, '').split('|');
                    for (let i = 0; i < googleResponse.length; suggestion.push(googleResponse[i++].split('-')));

                    console.log(`${chalk.blue('Did you mean:')} ${chalk.green.bold(`"${this.WhiteSpace(suggestion[0][1])} - ${this.WhiteSpace(suggestion[0][0])}"`)}`);
                    console.log(`\n${chalk.yellow('Here are some suggestions')}`)

                    for (let i = 1; i < 5; i++) {
                        if (suggestion[i] === undefined ||
                            suggestion[i].length <= 1 ||
                            suggestion[i].length > 2) {
                            i++;
                        }
                        else {
                            console.log(`${suggestion[i][1].toString().trim()} -  ${suggestion[i][0].toString().trim()}`);
                        }
                    }
                }
            });
        }
        catch (error) {
            return console.log(chalk.red('Lyrics not found :('), `${error.code}`);
        }
    }
}
export default Lyrics;

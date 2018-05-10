'use strict';

const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

class Lyrics {
    WhiteSpace(str) { return str.toString().trim(); }
    Spacer(str) {
        if (!str) return;
        return str.toString().toLowerCase().match(/[^_\s\W]+/g).join('');
    }

    ly(song, artist) {
        song = this.Spacer(song);
        artist = this.Spacer(artist);

        let LyricURL = `https://www.azlyrics.com/lyrics/${artist}/${song}.html`;
        let googleURL = `https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fwww.metrolyrics.com%2F+${song}+${artist}`

        return request(LyricURL, (error, response, body) => {
            let finalLyrics = [];
            let suggestion = [];

            if (error) throw new Error(error);
            if (response.statusCode >= 404) {
                this.suggestion(googleURL);
                return console.log(`Lyrics not found :(\n`);
            }
            const $ = cheerio.load(body);
            const lyrics = $('.text-center').children('div').text().toString().replace(/^(\n){2,}/gm, "\r\n").split('\n');

            console.log(`"${song} by ${artist}"\n`);
            for (let i = 0; i < lyrics.length; i++) {
                if (lyrics[i].includes('Submit Corrections')) { break; }
                finalLyrics.push(lyrics[i]);
            }
            console.log(finalLyrics.join('\n'));
        });
    }
    suggestion(url) {
        return request(url, (error, response, body) => {
            if (response.statusCode > 400) {
                return console.log(`Oh no :( There was an error \n${error}`);
            }

            let $ = cheerio.load(body);
            let res = $('.r > a').text();
            let suggestion = [];
            if (res) {
                let googleResponse = res.replace(/metroLyrics|lyrics|\.\.\.|http|video|audio/ig, '').split('|');
                for (let i = 0; i < googleResponse.length; suggestion.push(googleResponse[i++].split('-')));
                
                console.log(`${chalk.blue('Did you mean:')} ${chalk.green.bold(`"${this.WhiteSpace(suggestion[0][1])} - ${this.WhiteSpace(suggestion[0][0])}"`)}`);
                console.log(`\n${chalk.yellow('Here are some suggestions')}`)

                for (let i = 1; i < 10; i++) {
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
        return console.log(chalk.red('Lyrics not found :('));
    }
}

module.exports = Lyrics;

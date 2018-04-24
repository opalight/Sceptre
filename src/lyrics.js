const request = require('request');
const cheerio = require('cheerio');

class Lyrics {
    constructor(song, artist) {
        this.song = song;
        this.artist = artist;
    };
    removeSpaces(str) {
        return str.toString().trim();
    };
    spacer(str) {
        if (!str) return false;

        const capitalise = str.toString().split(' ').map((word) => word.toLowerCase().charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        return capitalise.match(/[^_\s\W]+/g).join('-');
    };

    ly(song, artist) {
        song = this.spacer(song);
        artist = this.spacer(artist);

        const lyricsURL = `https://www.musixmatch.com/lyrics/${artist}/${song}`;
        const suggestionURL = `https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fwww.musixmatch.com%2F+${song}+${artist}`;

        return request(lyricsURL, (error, response, body) => {
            if (error) throw new Error(error);
            if (response.statusCode == 404) {
                this.suggestion(suggestionURL);
                return console.log(`Lyrics not found :(\n`);
            }

            const $ = cheerio.load(body);
            const lyrics = $('.mxm-lyrics__content').text().toString().replace(/^(\n){2,}/gm, "\r\n");

            console.log(`"${song} by ${artist}"\n`);
            console.log(lyrics);
        });
    }
    suggestion(url) {
        return request(url, (error, response, body) => {
            if (response.statusCode > 400) {
                return console.log(`Oh no :( There was an error \n${error}`);
            }
            const $ = cheerio.load(body);
            const res = $('.r > a').text();
            let suggestion = [];
            if (res) {
                let googleResponse = res.replace(/musixmatch|lyrics|\.\.\.|http|video|audio/ig, '').split('|');
                for (let i = 0; i < googleResponse.length; suggestion.push(googleResponse[i++].split('-')));

                console.log(`Did you mean ${this.removeSpaces(suggestion[0][1])} - ${this.removeSpaces(suggestion[1][0])}`);
                console.log(`\nHere are some other suggestions`);
                for (let i = 1; i < 10; i++) {
                    if (suggestion[i] === undefined ||
                        suggestion[i].length <= 1 ||
                        suggestion[i].length > 2) {
                        i++;
                    }
                    else {
                        console.log(`${this.removeSpaces(suggestion[i][1])} -  ${this.removeSpaces(suggestion[i][0])}`);
                    }
                }

            }

        });
    }
}

module.exports = Lyrics;

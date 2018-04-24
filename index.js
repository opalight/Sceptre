const mail = require('./src/mail');
const lyrics = require('./src/lyrics');
const quad = require('./src/quad');
const shrug = require('./src/shrug');

class Hera {
    Shrug() {
        return shrug();
    }
    Quad(a, b, c) {
        return quad(a, b, c);
    }
    Mail(recipient, subject, message, password) {
        return new mail().Send(recipient, subject, message, password);
    }
    Lyrics(song, artist) {
        return new lyrics().ly(song, artist);
    }
}

module.exports = Hera;
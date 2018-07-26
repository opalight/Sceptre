/// <reference path="../hera.d.ts" />

import express from 'express';
import request from 'request';
import rootPath from 'app-root-path';
import querystring from 'query-string';
require('dotenv').config({ path: `${rootPath.path}/.env` });

let app: express.Application = express();
let port: string | number = process.env.PORT || 4000;
let ACCESS_TOKEN: string = '';
let REFRESH_TOKEN: string = '';
let EXPIRATION: string = '';


const scope: string = [
    'user-read-private',
    'user-read-birthdate',
    'user-read-email',
    'playlist-read-private',
    'user-library-read',
    'user-library-modify',
    'user-top-read',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-follow-read',
    'user-follow-modify',
    'user-read-currently-playing',
    'user-modify-playback-state',
    'user-read-recently-played'
].reduce((a, b) => { return `${a} ${b}` }, '');

app.get('/', (req: express.Request, res) => {
    server.close();
    return res.end('Hera Spotify API');
});

app.get('/authorise', (req: express.Request, res: express.Response) => {
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        state: Math.floor(Math.random() * 100),
        redirect_uri: `http://localhost:${port}/callback`,
    }));
});

app.get('/callback', (req: express.Request, res: express.Response) => {
    // get access token
    let OAuthCode = req.query.code;
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
        },
        form: {
            code: OAuthCode,
            redirect_uri: `http://localhost:${port}/callback`,
            grant_type: 'authorization_code'
        },
        json: true
    };
    request.post(authOptions, (err, response, body: any) => {
        if (err) throw new Error(err.message);

        console.log(body);
        ACCESS_TOKEN = body.access_token;
        REFRESH_TOKEN = body.refresh_token;
        EXPIRATION = body.expires_in;
    });
    res.send('Logged In. Enjoy');
    res.redirect('/')
});


let options: request.UriOptions | request.UrlOptions & request.CoreOptions = {
    url: 'https://api.spotify.com/v1/me',
    headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
    json: true
};
request.get(options, (err, res, body) => {
    if (err) {
        throw new Error(err);
    }
    console.log(body);
});



console.log(`Visit: http://localhost:4000/authorise`);
let server = app.listen(port, () => console.log(`Listening on port ${port}`));

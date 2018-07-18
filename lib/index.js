"use strict";
/**
 * Copyright (c) 2018 Collin Grimm
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
/// <reference path="./hera.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var mail_1 = require("./src/mail");
var lyrics_1 = require("./src/lyrics");
var quad_1 = require("./src/quad");
var shrug_1 = require("./src/shrug");
var tasks_1 = require("./src/tasks");
var Hera = /** @class */ (function () {
    function Hera() {
    }
    Hera.prototype.Shrug = function () {
        return shrug_1.shrug();
    };
    Hera.prototype.Quad = function (a, b, c) {
        return quad_1.quadratic(a, b, c);
    };
    Hera.prototype.Mail = function (Params) {
        var mailConfig = {
            recipient: Params.recipient,
            subject: Params.subject,
            message: Params.message,
            password: Params.password
        };
        return new mail_1.Mail().Send(mailConfig);
    };
    Hera.prototype.Lyrics = function (song, artist) {
        return new lyrics_1.Lyrics().SongLyrics({ title: song, artist: artist });
    };
    Hera.prototype.Tasks = function () {
        return new tasks_1.Tasks();
    };
    return Hera;
}());
exports.Hera = Hera;

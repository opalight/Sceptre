/**
 * Copyright (c) 2018 Collin Grimm
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const request = require('request');
require('dotenv').config();

const Parser = (obj) => {

    let objData = [];

    for (let i in obj.itemListElement) {
        objData.push({
            name: obj.itemListElement[i].result.name,
            description: obj.itemListElement[i].result.description,
            detail: obj.itemListElement[i].result.detailedDescription
        })
    }
    return objData;
}
class Knowledge {
    Search(searchQuery) {
        const params = {
            method: 'GET',
            url: 'https://kgsearch.googleapis.com/v1/entities:search',
            qs:
            {
                query: searchQuery,
                limit: 5,
                indent: true,
                key: process.env.KG_SEARCH
            }
        };
        request(params, (err, res, body) => {
            if (err) return console.log(`Error (${err.status}): ${err.message}`);
            
            const data = Parser(JSON.parse(body));
            console.log(`Here are some results for "${searchQuery}"\n`);
            console.log(body.toString());
            data.forEach(result => {
                console.log(result, '\n\n\n');

                console.log(`${result.name}\n${result.description}\n${result.detail.articleBody}\n\n`);
            });
        });
    }
}

new Knowledge().Search('Taylor Swift');
const request = require('request');
require('dotenv').config();

const Parser = (obj) => {

    let objData = [];

    for (let i in obj.itemListElement) {
        objData.push({
            name: obj.itemListElement[i].result.name,
            description: obj.itemListElement[i].result.description
        }
        )
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
            if (err) throw new Error(err.message);
            const data = Parser(JSON.parse(body));
            console.log(data);
        });
    }
}

new Knowledge().Search('Meaning of life');
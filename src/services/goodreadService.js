const ax = require('axios');
const { parseString } = require('xml2js')


function goodreadService(){
    function getBookById(id){
        return new Promise((resolve, reject)=> {
            ax.get(`https://www.goodreads.com/book/show/${id}.xml?key=1z1MDyKocfw5CTJ6tn4EnA`)
            .then( (response) => {
                parseString( response.data, (err, result) =>{
                    if(err){
                        console.log(`https://www.goodreads.com/book/show/${id+100}.xml?key=1z1MDyKocfw5CTJ6tn4EnA`);
                    } else {
                        console.log(result.GoodreadsResponse.book[0]);
                        resolve(result.GoodreadsResponse.book[0]);
                    }
                });
            })
            .catch((error) => {
                reject(error);
                console.log(error);
            });
        });
    }

    return {
        getBookById
    }
}

module.exports = goodreadService();
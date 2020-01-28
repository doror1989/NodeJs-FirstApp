const sql = require('mssql'); //  sql access

function bookController(bookService, nav) {
    function getIndex(req,res) {
        (async function query() {
          const sqlReq = new sql.Request();
          const { recordset } = await sqlReq.query('select * from Books');
            res.render('booksListView',
            {
              books: recordset,
              title: 'My BookList', 
              nav: nav
            });
        }());
    }

    function getById(req,res) {
        (async function queyWithParams() {
            const { id } = req.params; //looking for id in params
            const sqlReq = new sql.Request();
            const { recordset } = await sqlReq.input('id', sql.Int, id).query('select * from Books where Id = @id');
            const book = recordset[0];
            book.details = await bookService.getBookById(book.Id);

            res.render('bookView',
            {
              title: 'My Book', 
              nav: nav,
              book
            });
            }());
        }

    return {
        getIndex,
        getById
    };
}

module.exports = bookController;
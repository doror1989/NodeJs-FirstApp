const express = require('express');
const sql = require('mssql'); //    sql access
const bookController = require('../controllers/bookController.js');
const bookService = require('../services/goodreadService.js');
const bookRouter = express.Router();


function router(nav) {

  const { getIndex, getById } = bookController(bookService, nav);
  
  bookRouter.use((req, res, next) =>{
    if(req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  bookRouter.route('/').get(getIndex);

  bookRouter.route('/:id').get(getById);

  return bookRouter;
}

module.exports = router;
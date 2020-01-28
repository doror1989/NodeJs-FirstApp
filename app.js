const express = require('express');
const chalk = require('chalk'); //  color package
const morgan = require('morgan'); //    requests information;
const path = require('path'); //    path utilities
const sql = require('mssql'); //    sql access
const bodyParser = require('body-parser'); //   body Parser - json
const passport = require('passport'); //  authorization\ authentication
const cookieParser = require('cookie-parser'); // cookieParser
const session = require('express-session'); // session manager
const { Strategy } = require('passport-local'); 

const app = express();
const port = process.env.PORT || 3000;

const config = {
  user:'cudbuser',
  password:'S3curET!',
  server:'incidentsdbarc.c1ko8rpxm9lf.eu-west-1.rds.amazonaws.com',
  database: 'DorNodeTest'
};

sql.connect(config).catch( (err) => console.log(err) );
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false }));
app.use(cookieParser());
app.use(session({secret : 'Dor'}));
require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, 'Public')));
app.use('/Css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/Js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/Js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.set('views', './src/views');
app.set('view engine', 'ejs'); //app.set('view engine', 'pug');

const nav = [
  {link: '/books', title: 'Books'},
  {link: '/authors', title: 'Authors'}
];
const bookRouter = require('./src/routs/bookRoutes')(nav);
const authRouter = require('./src/routs/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  //res.send('First App');
 // res.sendFile(path.join(__dirname, 'Views', 'index.html'));
    res.render('indexStory',
    {
      title: 'Login Page', 
      nav: nav
    });
});

app.listen(port, () => {
  console.log(`Server is Up and ${chalk.green('Running')}`);
});

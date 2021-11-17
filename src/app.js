//NPM require
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session') 

/* Routes require */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/routes-user');

/* View engine */
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

/* Config express */
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.use (express.json());
app.use(session({secret: 'Cuidadito'})) 

/* Router access*/
app.use("/", indexRouter);
app.use("/users", usersRouter);

/* Server opening*/
app.listen(process.env.PORT || 3000, () => console.log('Servidor funcionando en el 3000'));
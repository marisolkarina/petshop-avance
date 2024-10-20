const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');

const adminRoutes = require('./routes/admin')
const tiendaRoutes = require('./routes/tienda');
const errorController = require('./controllers/error');
const loginRoutes = require('./routes/login');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));

app.use(loginRoutes);
app.use('/admin', adminRoutes);
app.use(tiendaRoutes);

app.use(errorController.get404)

app.listen(3000);
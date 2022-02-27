const path = require('path');
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // make style sheet available to the client

// turn on routes
app.use(routes);

// turn on connection to db and server 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
})

// in the sequelize.sync method, there is a configuration parameter- ({ force: false })
// if we change the value of the force property to true, then the database connection must syce with the model definitions and associations
// By forcing the sync method to true, we will make the tables re-create if there are any association changes
// works similiar to DROP TABLE IF EXISTS

// Once you turn on the server with sequelize.sync({ force: true }) and confirm the database tables were recreated, 
// switch back to using { force: false } and restart the server one more time just to make sure the changes took hold and you don't accidentally remove data!

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
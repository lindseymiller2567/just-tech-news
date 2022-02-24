const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
})

// in the sync method, there is a configuration parameter- ({ force: false })
// if we change the value of the force property to true, then the database connection must syce with the model definitions and associations
// By forcing the sync method to true, we will make the tables re-create if there are any association changes
// works similiar to DROP TABLE IF EXISTS

// Once you turn on the server with sequelize.sync({ force: true }) and confirm the database tables were recreated, 
// switch back to using { force: false } and restart the server one more time just to make sure the changes took hold and you don't accidentally remove data!
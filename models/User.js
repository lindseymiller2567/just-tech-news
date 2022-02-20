const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model { }

// define table columns and configuration
User.init(
    {
        // TABLE COLUMN DEFINITIONS GO HERE
        // define an id column
        id: {
            type: DataTypes.INTEGER, // use the special Sequelize DataTypes object provide what type of data it is
            allowNull: false, // this is the equivalent of SQL's `NOT NULL` option
            primaryKey: true, // instruct that this is the Primary Key
            autoIncrement: true // turn on auto increment
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // there cannot be any duplicate email values in this table
            validate: { // if allowNull is set to false, we can run our data through validators before creating (ie <string>@<string>.<string>)
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4] // this means password must be at least four characters long
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration)
        sequelize, // pass in our imported sequelize connection (the direct connection to our database)
        timestamps: false, // don't automatically create createdAt/updatedAt timestamp fields
        freezeTableName: true, // don't pluralize name of database table
        underscored: true, // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        modelName: 'user' // make it so our model name stays lowercase in the database
    }
)

// export the model so we can use it in other parts of the app
module.exports = User;
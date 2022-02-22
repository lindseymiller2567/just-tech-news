const User = require('./User'); // import the User model
const Post = require('./Post')

// create associations 
// creates the reference for the id column in the User model to link to the corresponding foreign key pair which is the user_id in the Post model
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//create associations 
// we are defining the relationship of the Post model to the User
// Post can belong to one user, but not many users
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post }; // and export an object with User as a property
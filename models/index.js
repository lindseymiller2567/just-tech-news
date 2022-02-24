const User = require('./User'); // import the User model
const Post = require('./Post')
const Vote = require('./Vote')
const Comment = require('./Comment')

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


User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment }; // and export an object with User as a property
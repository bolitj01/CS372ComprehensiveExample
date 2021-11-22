const mongoose = require('mongoose');

module.exports.isReady = mongoose.connect('mongodb://localhost:27017/Gallery');
const postSchema = new mongoose.Schema({
 imageUrl: String,
    likes: Number,
    dislikes: Number
});
const Post = mongoose.model('Posts', postSchema);

/**
 * Database Representation of a post.
 * @typedef {{imageUrl : string, likes : number, dislikes : number, _id: string}} Post
 */

/**
 * increment likes by one.
 *
 * @param {string} id
 *
 * @returns {Promise<void>}
 */
module.exports.like = async (id) => {
    const post = await Post.findById(id);
    post.likes++;
    await post.save();
}

/**
 * increment dislikes by one.
 *
 * @param {string} id
 *
 * @returns {Promise<void>}
 */
module.exports.dislike = async (id) => {
    const post = await Post.findById(id);
    post.likes++;
    await post.save();
}

/**
 * get one post by id.
 *
 * @param {string} id
 *
 * @returns {Promise<Post>}
 */
module.exports.getOne = async (id) => {
    return await Post.findByID(id);
}

/**
 * lists all posts.
 *
 * @returns {Promise<Post[]>}
 */
module.exports.getAll = async () => {
    return await Post.find();
}

/**
 * Create a new post.
 *
 * @param {{imageUrl: string, likes? : number, dislikes? : number}} postParams
 *
 * @returns {Promise<void>}
 */
module.exports.create = async (postParams) => {
    const post = new Post({
        likes: 0,
        dislikes: 0,
        ...postParams
    });

    await post.save();
}

/**
 *
 * @param {string} id
 *
 * @returns {Promise<void>}
 */
module.exports.delete = async (id) => {
    await Post.findByIdAndDelete(id);
}
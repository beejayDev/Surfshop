const Post = require('../models/post');
module.exports = {
	async getPosts(req, res, next) {
		let post = await Post.find({});
		res.render('posts/index', { post })
	},
	newPost(req, res, next) {
		res.render('posts/new')
	}
}


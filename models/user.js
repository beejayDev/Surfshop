const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email:{
                type: String,
                unique: true,
		required: true
	},
	username: {
                type: String,
		required: true,
                unique: true
        },
	password: {
		type: String,
		required: true
	},
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	image: String
});

module.exports = mongoose.model('User', UserSchema)

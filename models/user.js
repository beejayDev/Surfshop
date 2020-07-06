const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email:{
                type: String,
                unique: true,                                                                           required: true                                                                  },
	username: {
                type: String,                                                                           required: true,
                unique: true
        },
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	image: String
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)

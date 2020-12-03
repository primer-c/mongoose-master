const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongo-relation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const Schema = mongoose.Schema
const FocusSchema = new Schema({
	title: {
		type: String,
		trim: true,
		get(params){
			return '00001' + params
		}
	},
	picture: {type: String},
	redirect: {
		type: String, 
		set(params){
			if(!params){
				return ''
			}else{
				if(params.indexOf('http://') === -1 && params.indexOf('https://') === -1){
					return 'https://' + params
				}
				return params
			}
		}
	}
	
})

const Focus = mongoose.model('Focus',FocusSchema)

module.exports = Focus
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongo-posts', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//1. category
const Category = mongoose.model('Category', new mongoose.Schema({
    name: { type: String }
}))

//2. post
const Post = mongoose.model('Post', new mongoose.Schema({
    title: { type: String },
    content: { type: String },
		//2. 关联多个分类： 数组
		categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }]
}))

async function main() {
    //1.4 category 条件查询
		const category1 = await Category.findOne({name: '散文'})
		const category2 = await Category.findOne({name: '诗歌'})
    //2.4 post条件查询
		const post1 = await Post.findOne({title: '岳阳楼记'})
		const post2 = await Post.findOne({title: '离骚'})
		const post3 = await Post.findOne({title: '滕王阁序'})
	
		//2.5 多对多设置关联
		post1.categories = category1
		post1.save()

		post2.categories = category2
		post2.save()
				
		post3.categories = [category1, category2]
		post3.save()
		//查询
		const posts = await Post.find().populate('categories')
		console.log(posts[0],posts[1],posts[2])
}

main()
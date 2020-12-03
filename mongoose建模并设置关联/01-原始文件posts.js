const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongo-relation', {
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
    content: { type: String }
}))

async function main() {
    //1.1 category插入数据
		await Category.insertMany([
				{ name: '散文' },
				{ name: '诗歌' }
		])

    //1.2 category查询数据
		// const categories = await Category.find()
		console.log(categories)

    //1.3 category删除数据
    // await Category.db.dropCollection('categories')

    // -------------------------------------------------------------------

    // 2.1 post 插入数据
		await Post.insertMany([{
				title: "岳阳楼记",
				content: "先天下之忧而忧 后天下之乐而乐",
		}, {
				title: "离骚",
				content: "朝饮木兰之坠露兮 夕餐秋菊之落英",
		}, {
				title: "滕王阁序",
				content: "落霞与孤鹜齐飞 秋水共长天一色",
		}])

    //2.2 post查询数据
    const posts = await Post.find()
    console.log(posts)

    // 2.3 post删除数据
    await Post.db.dropCollection('posts')
}

main()
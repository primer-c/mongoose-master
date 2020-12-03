const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongo-posts', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const CategorySchema = new mongoose.Schema({
    name: { type: String }
})

CategorySchema.virtual('posts', {  // 定义虚拟字段
  ref: 'Post',                      // 关联的模型
  localField: '_id',                // 内键，Category模型的id字段
  foreignField: 'categories',       // 外键，关联模型的category字段
  justOne: false                    // 不是只查询一条数据
})
//1. category
const Category = mongoose.model('Category', CategorySchema)

//2. post
const Post = mongoose.model('Post', new mongoose.Schema({
    title: { type: String },
    content: { type: String },
		//2. 关联多个分类： 数组
		categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }]
}))

async function main() {
		const categories = await Category.find().populate('posts')
		console.log(categories[0].posts)
		console.log(categories[1].posts)
}

main()
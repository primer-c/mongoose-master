const Focus = require('./models/Focus')

const focus = new Focus({
	title: ' Hello World  ',
	picture: 'http://www.hello.com/focus.jpg',
	redirect: 'https://www.hello.com'
})

async function saveHandler(){
	// await focus.save()
	
	console.log(focus.title)
}

saveHandler()
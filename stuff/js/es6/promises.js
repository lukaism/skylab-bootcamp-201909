// 0

new Promise((resolve, reject) => {
	resolve(10)
})
	.then(res => res * 10)
	.then(res => { console.log(res); return res })
	.catch(error => console.error(1, error.message))
	.then(res => { throw Error(res) })
	.then(res => res + 10)
	.then(res => console.log(res))
	.catch(error => console.error(2, error.message))

// 1

fetch('http://duckling-api.herokuapp.com/api/search?q=green') // Fetch API
	.then(res => res.json())
	.then(ducks => {
		ducks.forEach(({id}) => fetch(`http://duckling-api.herokuapp.com/api/ducks/${id}`)
									.then(res => res.json())
									.then(duck => console.log(duck)))
	})

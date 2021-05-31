import Observer from './observer'
import Watcher from './watcher'

const data: any = { a: 1, b: 2, deep: { a: {}, b: 2 }, array: [1, 2, 3, [4, 5]] }

new Observer(data)

// const computed = new Watcher(
// 	data,
// 	function () {
// 		return this.a + this.b
// 	},
// 	(oldVal, newVal) => {
// 		console.log('computed:')
// 		console.log('	oldVal:', oldVal)
// 		console.log('	newVal:', newVal)
// 	}
// )

// const noraml = new Watcher(data, 'a', (oldVal, newVal) => {
// 	console.log('noraml:')
// 	console.log('	oldVal:', oldVal)
// 	console.log('	newVal:', newVal)
// })

// const array = new Watcher(data, 'array', (oldVal, newVal) => {
// 	console.log('array:')
// 	console.log('	oldVal:', oldVal)
// 	console.log('	newVal:', newVal)
// })

// const array0 = new Watcher(data, 'array.3.0', (oldVal, newVal) => {
// 	console.log('array.3.0:')
// 	console.log('	oldVal:', oldVal)
// 	console.log('	newVal:', newVal)
// })

const deep = new Watcher(data, 'deep', (oldVal, newVal) => {
	console.log('deep:')
	console.log('	oldVal:', oldVal)
	console.log('	newVal:', newVal)
})

const deepa = new Watcher(data, 'deep.a', (oldVal, newVal) => {
	console.log('deep.a:')
	console.log('	oldVal:', oldVal)
	console.log('	newVal:', newVal)
})

// console.log('================== test computed ==================')
// data.a = 0
// data.b = 0

// console.log('================== test cache ==================')
// data.a = 0
// data.b = 0

console.log('================== test deep ==================')
data.deep.a = {}
// data.deep = 0

// console.log('================== test array ==================')
// data.array[3][0] = 1
// data.array.push(1, 2, 3)
// data.array.pop()

// console.log('================== test unwatch ==================')
// noraml.teardown()
// computed.teardown()
// data.a = 0

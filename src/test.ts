import Observer from './observer'
import Watcher from './watcher'

const data: any = { a: 1, b: 2, c: { a: 1, b: 2 } }

new Observer(data)

const watcher1 = new Watcher(data, 'a', (oldVal, newVal) => {
	console.log('watcher1:')
	console.log('	oldVal:', oldVal)
	console.log('	newVal:', newVal)
})

const watcher2 = new Watcher(data, 'c', (oldVal, newVal) => {
	console.log('watcher2:')
	console.log('	oldVal:', oldVal)
	console.log('	newVal:', newVal)
})

const watcher3 = new Watcher(data, 'c.a', (oldVal, newVal) => {
	console.log('watcher3:')
	console.log('	oldVal:', oldVal)
	console.log('	newVal:', newVal)
})

const watcher4 = new Watcher(
	data,
	function () {
		return this.a + this.b
	},
	(oldVal, newVal) => {
		console.log('watcher4:')
		console.log('	oldVal:', oldVal)
		console.log('	newVal:', newVal)
	}
)

//test reactive
console.log('==================test reactive==================')

data.a = 0
data.b = 0
data.c.a = 0
data.c = 0

//test cache
console.log('==================test cache==================')
data.a = 0
data.c = 0

//test unwatch
console.log('==================test unwatch==================')
watcher1.teardown()
watcher4.teardown()
data.a = 0

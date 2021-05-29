import Dep from './dep'

class Observer {
	private data: object = Object.create(null)

	constructor(data: object) {
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				if (typeof data[key] === 'object') {
					new Observer(data[key])
				}
				const self = this
				const dep = new Dep()
				Object.defineProperty(self.data, key, {
					value: data[key],
					enumerable: true,
					writable: true,
				})
				Object.defineProperty(data, key, {
					get() {
						if (Dep.target) {
							dep.addSub()
						}
						return self.data[key]
					},
					set(value) {
						if (value !== self.data[key]) {
							if (typeof value === 'object') {
								new Observer(value)
							}
							self.data[key] = value
							dep.notify()
						}
						return true
					},
				})
			}
		}
	}
}

export default Observer

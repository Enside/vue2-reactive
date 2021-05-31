import Dep from './dep'

class Observer {
	private data: object = Object.create(null)

	constructor(data: object, parentDep?: Dep) {
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				const dep = new Dep(parentDep)
				this.process(data[key], dep)
				this.hijack(data, key, dep)
			}
		}
	}

	private process(value: any, dep: Dep) {
		if (value instanceof Array) {
			this.rewriteArrayFn(value, dep)
		} else if (typeof value === 'object') {
			new Observer(value, dep)
		}
	}

	private hijack(data: object, key: string | number, dep: Dep) {
		const self = this
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
					self.process(value, dep)
					self.data[key] = value
					dep.notify()
				}
				return true
			},
		})
	}

	private rewriteArrayFn(array: any[], dep: Dep) {
		Object.defineProperties(array, {
			push: {
				value(...items: any[]): number {
					const length = Array.prototype.push.apply(array, items)
					dep.notify()
					return length
				},
			},
			pop: {
				value(): any {
					const item = Array.prototype.pop.apply(array)
					dep.notify()
					return item
				},
			},
			splice: {
				value(start: number, deleteCount?: number): any[] {
					const newArray = Array.prototype.splice.apply(array, [
						start,
						deleteCount,
					])
					dep.notify()
					return newArray
				},
			},
		})
	}
}

export default Observer

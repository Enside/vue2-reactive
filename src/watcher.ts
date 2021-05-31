import Dep from './dep'

class Watcher {
	deps: Dep[] = []
	private data: object
	private expOrFn: string[] | Function
	private cb: (oldVal: any, newVal: any) => void
	private cache: any = undefined

	constructor(
		data: object,
		expOrFn: string | Function,
		cb: (oldVal?: any, newVal?: any) => void
	) {
		this.data = data
		if (typeof expOrFn === 'string') {
			this.expOrFn = expOrFn.split('.')
		} else {
			this.expOrFn = expOrFn.bind(data)
		}
		this.cb = cb
		Dep.target = this
		this.update()
		Dep.target = null
	}

	update() {
		const oldVal = this.cache
		const newVal = this.getValue()
		if (oldVal !== newVal) {
			this.cache = newVal
			this.cb(oldVal, newVal)
		} else if (typeof oldVal === 'object') {
			this.cb(oldVal, newVal)
		}
	}

	teardown() {
		this.deps.forEach((dep) => {
			dep.removeSub(this)
		})
	}

	private getValue(): any {
		if (this.expOrFn instanceof Array) {
			const path = this.expOrFn
			const levelNumber = path.length
			let levelData = this.data
			for (let index = 0; index < levelNumber; index++) {
				if (index + 1 === levelNumber) {
					const value = levelData[path[index]]
					this.walkChildren(value)
					return value
				}
				levelData = levelData[path[index]]
				if (!levelData) {
					return undefined
				}
			}
		} else {
			return this.expOrFn()
		}
	}

	private walkChildren(data: any) {
		if (typeof data === 'object' && !(data instanceof Array)) {
			for (const key in data) {
				if (Object.prototype.hasOwnProperty.call(data, key)) {
					this.walkChildren(data[key])
				}
			}
		}
	}
}

export default Watcher

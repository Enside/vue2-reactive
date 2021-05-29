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
		Dep.target = this
		this.data = data
		if (typeof expOrFn === 'string') {
			this.expOrFn = expOrFn.split('.')
		} else {
			this.expOrFn = expOrFn.bind(data)
		}
		this.cb = cb
		this.update()
		Dep.target = null
	}

	update() {
		const oldVal = this.cache
		const newVal = this.getValue()
		if (oldVal !== newVal) {
			this.cache = newVal
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
					return levelData[path[index]]
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
}

export default Watcher

import Watcher from './watcher'

class Dep {
	static target: Watcher = null
	private subs: Watcher[] = []
	private parentDep: Dep

	constructor(parentDep?: Dep) {
		this.parentDep = parentDep
	}

	addSub() {
		this.subs.push(Dep.target)
		Dep.target.deps.push(this)
	}

	removeSub(target: Watcher) {
		this.subs.some((sub, index) => {
			if (sub === target) {
				this.subs.splice(index, 1)
				return true
			}
		})
	}

	notify() {
		this.subs.forEach((sub) => {
			sub.update()
		})
		if (this.parentDep) {
			this.parentDep.notify()
		}
	}
}

export default Dep

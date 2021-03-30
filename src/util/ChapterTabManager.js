const ChapterTabManager = {
	_subscribers: {},
    _counter: 1,
    _tabs: {},
    createChapterTab ({reference, modules}) {
        const count = this._counter++
        const id = `chTab${count}`
        this._tabs[id] = {
            reference,
            modules
        }
        return id
    },
	getTab(id) {
		return (id in this._tabs) ? this._tabs[id] : -1
	},
	setTab({reference, modules, id}) {
        this._tabs[id] = {
            reference,
            modules
        }
		this._subscribers[id].forEach(s => s(this._tabs[id]))
	},
	subscribe({subscriber, id}) {
        if (!(id in this._subscribers)) {
            this._subscribers[id] = []
        }
		this._subscribers[id].push(subscriber)
	}
}

export default ChapterTabManager
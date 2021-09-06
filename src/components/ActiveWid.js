const ActiveWid = {
	_activeWid: [-1, -1],
	_subscribers: [],
	get activeWid() {
		return this._activeWid
	},
	set activeWid(widAndModuleId) {
		this._activeWid = widAndModuleId
		this._subscribers.forEach((s) => s(widAndModuleId))
	},
	subscribe(subscriber) {
		this._subscribers.push(subscriber)
	},
}
export default ActiveWid

// try this with recoiljs.org


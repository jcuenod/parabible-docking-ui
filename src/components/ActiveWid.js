
const ActiveWid = {
    _activeWid: -1,
    _subscribers: [],
    get activeWid() {
        return this._activeWid
    },
    set activeWid(wid) {
        this._activeWid = wid
        this._subscribers.forEach(s => s(wid))
    },
    subscribe(subscriber) {
        this._subscribers.push(subscriber)
    }
}
export default ActiveWid
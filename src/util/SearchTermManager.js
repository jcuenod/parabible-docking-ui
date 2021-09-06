const b64EncodeUnicode = (str) => {
	// first we use encodeURIComponent to get percent-encoded UTF-8,
	// then we convert the percent encodings into raw bytes which
	// can be fed into btoa.
	return btoa(
		encodeURIComponent(str).replace(
			/%([0-9A-F]{2})/g,
			(match, p1) => String.fromCharCode(`0x${p1}`),
		),
	)
}

let maxSubscriberId = 0
const SearchTermManager = {
	_searchTerms: [],
	_subscribers: [],
	_notify() {
		console.log("notifying...")
		console.log(this._subscribers.length)
		this._subscribers.forEach(s => {
			console.log(s)
			s.callback(this._searchTerms)
		})
	},
	get searchTerms() {
		return this._searchTerms
	},
	set searchTerms(newTerms) {
		this._searchTerms = newTerms.slice(0)
		this._notify()
	},
	push(newTerm) {
		this._searchTerms.push(newTerm)
		this._notify()
	},
	delete(index) {
		// const index = this._searchTerms.findIndex(st => st.id === index)
		this._searchTerms.splice(index, 1)
		this._notify()
	},
	subscribe(callback) {
		console.log("new subscriber")
		this._subscribers.push({
			id: ++maxSubscriberId,
			callback
		})
		return maxSubscriberId
	},
	toBase64String() {
		return b64EncodeUnicode(JSON.stringify(this._searchTerms))
	}
}

export default SearchTermManager
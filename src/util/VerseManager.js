import bookDetails from "../data/bookDetails.json"

// const modules = ["BHSA"]
const bCh = ({ book, chapter }) =>
	(bookDetails.findIndex((b) => b.name === book) + 1) * 1000 + chapter

const url = ({ modules, book, chapter }) =>
	`http://localhost:8080/api/v2/chapter/${modules.join("+")}/${bCh({
		book,
		chapter,
	})}`

const VerseManager = {
	_chapterData: new Map(),

	async _fetchChapter({ book, chapter, modules }) {
		const api = await fetch(url({ modules, book, chapter }), {
			headers: {
				"content-type": "application/json; charset=utf-8",
				mode: "cors",
			},
		})
		const response = await api.json()
		console.log(response)
		return response.data
	},

	async _storeChapter({ book, chapter, data }) {
		/* TODO: Right now this is just in memory but use browser's index db? */
		this._chapterData.set(`${book}_${chapter}`, data)
	},

	async _fetchAndStoreChapter({ book, chapter, modules }) {
		const data = await this._fetchChapter({ book, chapter, modules })
		this._storeChapter({ book, chapter, data })
		return data
	},

	//TODO rewrite this func to work with the logic of multiple modules
	async getChapter({ reference, modules }) {
		const { book, chapter } = reference
		// if (this._chapterData.has(`${book}_${chapter}`)) {
		//     return this._chapterData[book][chapter]
		// }
		return await this._fetchAndStoreChapter({ book, chapter, modules })
	},
}

export default VerseManager

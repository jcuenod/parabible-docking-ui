const VerseManager = {
    _chapterData: new Map(),

    async _fetchChapter({ book, chapter }) {
        const api = await fetch("https://parabible.com/api/chapter-text", {
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            mode: "cors",
            body: JSON.stringify({ "reference": { book, chapter }, "texts": ["wlc"] })
        })
        const data = await api.json()
        return data
    },

    async _storeChapter({ book, chapter, data }) {
        /* TODO: Right now this is just in memory but use browser's index db? */
        this._chapterData.set(`${book}_${chapter}`, data)
    },

    async _fetchAndStoreChapter({ book, chapter }) {
        const data = await this._fetchChapter({ book, chapter })
        this._storeChapter({ book, chapter, data })
        return data
    },

    async getChapter({ book, chapter }) {
        if (this._chapterData.has(`${book}_${chapter}`)) {
            return this._chapterData[book][chapter]
        }
        return await this._fetchAndStoreChapter({ book, chapter })
    }
}

export default VerseManager
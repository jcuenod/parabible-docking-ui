const fetchChapter = ({ book, chapter }) => new Promise((resolve, reject) => {
    fetch("https://parabible.com/api/chapter-text", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        mode: "cors",
        body: JSON.stringify({ "reference": { book, chapter }, "texts": ["wlc"] })
    }).then(r => r.json()).then(data => {
        resolve({ book, chapter, data })
    }).catch(e => {
        console.log("oh no/..")
        console.error(e)
        reject(e)
    })
})

export default fetchChapter
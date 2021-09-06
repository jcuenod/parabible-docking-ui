const bookDetails = require("../data/bookDetails.json")

const bCh = ({book, chapter}) =>
 (bookDetails.findIndex(b => b.abbreviation === book) + 1) * 1000 + chapter

const texts = ["BHSA"]
const fetchChapter = ({ book, chapter }) => new Promise((resolve, reject) => {

    fetch(`http://localhost:8080/api/v2/chapter/${texts.join("+")}/${bCh({book, chapter})}`, {
        headers: { "content-type": "application/json; charset=utf-8" }
    }).then(r => r.json()).then({data} => {
        resolve({ book, chapter, data })
    }).catch(e => {
        console.log("oh no/..")
        console.error(e)
        reject(e)
    })
})

export default fetchChapter

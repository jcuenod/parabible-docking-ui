const fetchWord = ({ wid }) => new Promise((resolve, reject) => {
    fetch("https://parabible.com/api/word-lookup", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        mode: "cors",
        body: JSON.stringify({ wid })
    }).then(r => r.json()).then(data => {
        resolve(data)
    }).catch(e => {
        console.log("oh no/..")
        console.error(e)
        reject(e)
    })
})

export default fetchWord
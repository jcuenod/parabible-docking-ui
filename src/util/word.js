const fetchWord = ({wid, moduleId}) => new Promise((resolve, reject) => {
    fetch(`http://localhost:8080/api/v2/word/${moduleId}/${wid}`, {
        // method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        // mode: "cors",
        // body: JSON.stringify({ wid })
    }).then(r => r.json()).then(data => {
        resolve(data)
    }).catch(e => {
        console.log("oh no/..")
        console.error(e)
        reject(e)
    })
})

export default fetchWord
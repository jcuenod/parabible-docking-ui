import React, { useState } from "react"
import ActiveWid from "./ActiveWid"
import fetchWord from "../util/word"

const objectToTable = obj =>
    <table>
        {Object.keys(obj).map(key =>
            <tr>
                <td>{key}</td>
                <td>{obj[key]}</td>
            </tr>
        )}
    </table>


const Morphology = () => {
    const [details, setDetails] = useState(false)
    ActiveWid.subscribe(wid => {
        fetchWord({ wid }).then(data => {
            setDetails(data.results)
        })
    })
    if (details === false) {
        return <div>Nothing to see here</div>
    }
    return <div>
        {objectToTable(details)}
    </div>
}
export default Morphology
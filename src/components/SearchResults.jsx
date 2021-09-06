import React, { useState, useEffect } from "react"
import lang from "../data/languages.json"
import WarmWords from "./WarmWords"


const SearchResult = ({ searchResult }) => {
    const mainModule = searchResult.module_id
    const warmWids = searchResult.wids
    const hotWids =
        Object.keys(searchResult)
            .filter(k => /w\d+_wids/.test(k))
            .map(k => {
                const wx = k.slice(0, k.indexOf("_"))
                return {
                    moduleId: searchResult[wx + "_module_id"],
                    wids: searchResult[k]
                }
            })

    const parallelIds = searchResult.parallel_ids
    parallelIds.sort(function (a, b) {
        return a - b
    })

    return parallelIds.map(pId =>
        <tr>{searchResult.parallel_text.find(t => t.parallel_id === pId)["modules"].map(module => {
            console.log(module)
            const hotWidConcat = [].concat(...hotWids.filter(h => h.moduleId === module.module_id).map(h => h.wids))
            return <td style={lang.style[lang.byModuleId[module.module_id]]}>
                <WarmWords
                    activeWid={[-1, -1]}
                    module={module}
                    warmWids={module.module_id === mainModule ? warmWids : []}
                    hotWids={hotWidConcat}
                />
            </td>
        }
        )}</tr>
    )
}

const SearchResults = ({ searchResults }) =>
    <table className="table-fixed">
        {searchResults.map(s => <SearchResult searchResult={s} />)}
    </table>
export default SearchResults

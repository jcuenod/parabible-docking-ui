import React from "react"
import ActiveWid from "./ActiveWid"

const highlightWordClasses = {
    "none": `
        text-gray-800
        hover:text-blue-600
        cursor-pointer`,
    "active": `
        text-blue-500
        hover:text-blue-700
        cursor-pointer`,
    "hot": `
        text-red-500
        hover:text-red-700
        cursor-pointer`,
    "warm": `
        text-yellow-500
        hover:text-yellow-700
        cursor-pointer`
}
const Word = ({ highlight, word, moduleId }) => {
    const { wid, prefix, text, trailer, suffix } = word
    return [
        prefix || null,
        <span
            key={wid}
            className={highlightWordClasses[highlight || "none"]}
            onClick={() => {
                ActiveWid.activeWid = [wid, moduleId]
            }}
        >
            {text}
        </span >,
        suffix || null,
        trailer || null,
    ]
}
export default Word
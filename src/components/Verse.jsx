import React from "react"
import Word from "./Word"

const verseNumberClasses = `
    whitespace-nowrap
    relative
    -top-3
    text-xs
    text-red-600
    hover:bg-yellow-100
    text-xs
`
const Verse = ({ activeWid, module }) => {
    console.log("rendering verse")
    const [aWid, aModId] = activeWid
    const { text_as_html_string, text_as_word_array } = module

    let output = "Failed to read data from server"
    if (text_as_word_array) {
        output = text_as_word_array.map((word, i) => (
            <Word
                key={i}
                word={word}
                highlight={aWid === word.wid && aModId === module.module_id ? "active" : null}
                moduleId={module.module_id}
            />
        ))
    }
    else if (text_as_html_string) {
        output = <span>{text_as_html_string}</span>
    }

    return (
        <span key={module.rid} className="hover:bg-yellow-100">
            <span className={verseNumberClasses} style={{ fontFamily: "sans" }}>
                {(module.rid % 1000) + " "}
            </span>
            {output}
        </span>
    )
}
export default Verse
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
const WarmWords = ({ activeWid, module, warmWids, hotWids }) => {
    console.log("rendering verse")
    const [aWid, aModId] = activeWid
    const { text_as_html_string, text_as_word_array } = module

    const highlightType = wid => aWid === wid && aModId === module.module_id
        ? "active"
        : hotWids.includes(wid)
            ? "hot"
            : warmWids.includes(wid)
                ? "warm"
                : "none"

    let output = "Failed to read data from server"
    if (text_as_word_array) {
        output = text_as_word_array.map((word, i) => {
            console.log("hi!!!")
            console.log(highlightType(word.wid))
            return (
                <Word
                    key={i}
                    word={word}
                    highlight={highlightType(word.wid)}
                    moduleId={module.module_id}
                />
            )
        })
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
export default WarmWords
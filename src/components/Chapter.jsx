import React, { useState } from "react"
import fetchChapter from "../util/chapter"
import ActiveWid from "./ActiveWid"


const WBit = activeWid => ({ wid, word, trailer }) => [
    <span
        className={activeWid === wid ? "word active" : "word"}
        onClick={() => ActiveWid.activeWid = wid}
    >
        {word}
    </span>,
    trailer || null
]
const Word = ({ wbits, index, verseNumber, activeWid }) =>
    index === 0 ?
        [<span className="verse">{verseNumber + " "}</span>,
        wbits.map(WBit(activeWid))]
        : wbits.map(WBit(activeWid))

const Verse = (activeWid) => ({ rid, wlc }) =>
    <span className="hover:bg-yellow-100">
        {wlc.map((wbits, i) =>
            <Word wbits={wbits} index={i} activeWid={activeWid} verseNumber={rid % 1000} />
        )}
    </span>

const Chapter = () => {
    const [verseArray, setVerseArray] = useState([])
    const [activeWid, setActiveWid] = useState(ActiveWid.activeWid)
    ActiveWid.subscribe(setActiveWid)
    if (verseArray.length === 0) {
        fetchChapter({ book: "Genesis", chapter: 1 }).then(response => {
            console.log(response)
            setVerseArray(response.data.text)
        })
    }
    return <div style={{ padding: "10px", direction: "rtl", fontSize: "180%", fontFamily: "SBL Hebrew", lineHeight: "1.6" }}>
        <style>{`
            .verse {
                white-space: nowrap;
                position: relative;
                top: -10px;
                font-size: 50%;
                color: #f00;
            }
            .word:hover {
                color: #f0f;
                cursor: pointer;
            }
            .word.active {
                color: #00f;
            }`}
        </style>
        {verseArray.map(Verse(activeWid))}
    </div>
}

export default Chapter
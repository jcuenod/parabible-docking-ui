import React, { useState, useEffect } from "react"
import VerseManager from "../util/VerseManager"
import ActiveWid from "./ActiveWid"

const wordClasses = `
	text-gray-800
	hover:text-blue-600
	cursor-pointer
`
const activeWordClass = `
	text-blue-500
	hover:text-blue-700
	cursor-pointer
`
const WBit = (activeWid) => ({ wid, word, trailer }) => [
	<span
		key={wid}
		className={activeWid === wid ? activeWordClass : wordClasses}
		onClick={() => (ActiveWid.activeWid = wid)}
	>
		{word}
	</span>,
	trailer || null,
]

const verseNumberClasses = `
	whitespace-nowrap
	relative
	-top-3
	text-xs
	text-red-600
	hover:bg-yellow-100
`
const Word = ({ wbits, index, verseNumber, activeWid }) =>
	index === 0
		? [
			<span key={index} className={verseNumberClasses}>
				{verseNumber + " "}
			</span>,
			wbits.map(WBit(activeWid)),
		]
		: wbits.map(WBit(activeWid))

const Verse = (activeWid) => ({ rid, wlc }) => (
	<span key={rid} className="hover:bg-yellow-100">
		{wlc.map((wbits, i) => (
			<Word
				key={i}
				wbits={wbits}
				index={i}
				activeWid={activeWid}
				verseNumber={rid % 1000}
			/>
		))}
	</span>
)

const Chapter = ({ id }) => {
	const [verseArray, setVerseArray] = useState([])
	const [activeWid, setActiveWid] = useState(ActiveWid.activeWid)
	useEffect(async () => {
		ActiveWid.subscribe(setActiveWid)
		const data = await VerseManager.getChapter(window.chapterTabs[id].reference)
		setVerseArray(data.text)
	}, [])
	return (
		<div
			className="p-2 text-3xl max-w-screen-md m-auto"
			style={{
				direction: "rtl",
				fontFamily: "SBL Hebrew",
				lineHeight: "1.6",
			}}
		>
			{verseArray.map(Verse(activeWid))}
		</div>
	)
}

export default Chapter

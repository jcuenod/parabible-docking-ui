import React, { useState, useEffect } from "react"
import VerseManager from "../util/VerseManager"
import ChapterTabManager from "../util/ChapterTabManager.js"
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
const Word = ({ activeWid, word, moduleId }) => {
	const { wid, prefix, text, trailer, suffix } = word
	return [
	prefix || null,
	<span
		key={wid}
		className={activeWid === [wid, moduleId] ? activeWordClass : wordClasses}
		onClick={() => {
			ActiveWid.activeWid = [wid, moduleId]
		}}
	>
		{text}
	</span>,
	suffix || null,
	trailer || null,
]
}

const verseNumberClasses = `
	whitespace-nowrap
	relative
	-top-3
	text-xs
	text-red-600
	hover:bg-yellow-100
	text-xs
`


const Verse = (activeWid) => ({ p1_rid, p1_text, p1_version_id }) => 
	<span key={p1_rid} className="hover:bg-yellow-100">
		<span
		className={verseNumberClasses}
		style={{fontFamily: "sans"}}
		>
			{p1_rid % 1000 + " "}
		</span>
		{!Array.isArray(p1_text)
		? <span>{p1_text}</span>
		: p1_text.map((word, i) => (
			<Word
				key={i}
				word={word}
				activeWid={activeWid}
				moduleId={p1_version_id}
			/>
		))}
	</span>


const languageStyles = {
	"hebrew":{
		fontFamily: "SBL Biblit",
		direction: "rtl",
		fontSize: "1.875rem",
		lineHeight: "1.6",
	},
	"greek": {
		fontFamily: "SBL Biblit",
		fontSize: "1.25rem",
		lineHeight: "2",
	},
	"english": {
		fontSize: "1.1rem",
		lineHeight: "1.8",
		padding: "1.1rem 0.7rem"
	}
}
const SingleChapter = ({ verses, activeWid, language }) => {
	return (
		<div
			className="p-2 max-w-screen-md m-auto"
			style={languageStyles[language]}
		>
			{verses.map(Verse(activeWid))}
		</div>
	)
}

const languages = {
	"Nestle1904": "greek",
	"LXX": "greek",
	"ULT": "english",
	"UST": "english",
	"BHSA": "hebrew",
}
const Chapter = ({id}) => {
	const [modules, setModules] = useState([])
	const [verseArray, setVerseArray] = useState([])
	const [activeWid, setActiveWid] = useState(ActiveWid.activeWid)
	useEffect(async () => {
		ActiveWid.subscribe(setActiveWid)
		const {reference, modules} = ChapterTabManager.getTab(id)
		console.log(reference, modules)
		const data = await VerseManager.getChapter({reference, modules})
		setVerseArray(data)
		setModules(modules)
	}, [])
	if (modules.length === 0) {
		return null
	}
	if (modules.length > 1){
		return "Not supporting parallels yet"
	}
	else {
		const module = modules[0]
		return <SingleChapter verses={verseArray} activeWid={activeWid} language={languages[module]} />
	}
}

export default Chapter

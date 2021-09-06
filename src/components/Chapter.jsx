import React, { useState, useEffect } from "react"
// import Word from "./Word"
import Verse from "./Verse"
import VerseManager from "../util/VerseManager"
import ChapterTabManager from "../util/ChapterTabManager.js"
import ActiveWid from "./ActiveWid"

import lang from "../data/languages.json"

const SingleChapter = ({ verses, activeWid, language }) => {
	return (
		<div
			className="p-2 max-w-screen-md m-auto"
			style={lang.style[language]}
		>
			{verses.map(({ modules }) => (
				<Verse activeWid={activeWid} module={modules[0]} />
			))}
		</div>
	)
}
const AdjacentButton = ({ previous = true, onClick }) => (
	<button
		onClick={onClick}
		className={`w-full
			p-1
			bg-gray-100
			hover:bg-gray-200
			text-gray-600
			hover:text-gray-800
			cursor-pointer
			text-center
			font-bold
			text-sm
			uppercase`}
	>
		{previous ? "Previous Chapter" : "Next Chapter"}
	</button>
)


const Chapter = ({ id }) => {
	const [modules, setModules] = useState([])
	const [verseArray, setVerseArray] = useState([])
	const [activeWid, setActiveWid] = useState(ActiveWid.activeWid)
	useEffect(async () => {
		ActiveWid.subscribe(setActiveWid)
		const { reference, modules } = ChapterTabManager.getTab(id)
		console.log(reference, modules)
		const data = await VerseManager.getChapter({ reference, modules })
		setVerseArray(data)
		setModules(modules)
	}, [])
	if (modules.length === 0) {
		return null
	}
	if (modules.length > 1) {
		return "Not supporting parallels yet"
	} else {
		const module = modules[0]
		return (
			<>
				<AdjacentButton previous={true} />
				<SingleChapter
					verses={verseArray}
					activeWid={activeWid}
					language={lang.byModuleName[module]}
				/>
				<AdjacentButton previous={false} />
			</>
		)
	}
}
export default Chapter

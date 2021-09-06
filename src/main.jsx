import React from "react"
import ReactDOM from "react-dom"
import { DockLayout } from "rc-dock"
import "rc-dock/dist/rc-dock.css"
import "./App.css"

import Header from "./components/Header.jsx"
import Chapter from "./components/Chapter.jsx"
import ChapterTabTitle from "./components/ChapterTabTitle.jsx"
import Morphology from "./components/Morphology.jsx"
import SearchTerms from "./components/SearchTerms.jsx"


import ChapterTabManager from "./util/ChapterTabManager.js"
let mainTabId = ChapterTabManager.createChapterTab({
	reference: {
		book: "Genesis",
		chapter: 9
	},
	modules: ["ETCBC BHSA"]
})
const mainTab = {
	closable: false,
	cached: true,
	title: <ChapterTabTitle id={mainTabId} />,
	content: <Chapter id={mainTabId} />,
	id: mainTabId
}

let mainTabId2 = ChapterTabManager.createChapterTab({
	reference: {
		book: "Mark",
		chapter: 1
	},
	modules: ["Nestle1904"]
})
const mainTab2 = {
	closable: false,
	cached: true,
	title: <ChapterTabTitle id={mainTabId2} />,
	content: <Chapter id={mainTabId2} />,
	id: mainTabId2
}
let mainTabId3 = ChapterTabManager.createChapterTab({
	reference: {
		book: "Genesis",
		chapter: 1
	},
	modules: ["CCAT LXX"]
})
const mainTab3 = {
	closable: false,
	cached: true,
	title: <ChapterTabTitle id={mainTabId3} />,
	content: <Chapter id={mainTabId3} />,
	id: mainTabId3
}

let tab = {
	title: 'Tab',
	content: <div className="text-lg">The MT has simply “and Cain said to Abel his brother,” omitting Cain’s words to Abel. It is possible that the elliptical text is original. Perhaps the author uses the technique of aposiopesis, “a sudden silence” to create tension. In the midst of the story the narrator suddenly rushes ahead to what happened in the field. It is more likely that the ancient versions (Smr, LXX, Vulgate, and Syriac), which include Cain’s words, “Let’s go out to the field,” preserve the original reading here. After writing אָחִיו (ʾakhiyv, “his brother”), a scribe’s eye may have jumped to the end of the form בַּשָׂדֶה (bassadeh, “to the field”) and accidentally omitted the quotation. This would be an error of virtual homoioteleuton. In older phases of the Hebrew script the sequence יו (yod-vav) on אָחִיו is graphically similar to the final ה (he) on בַּשָׂדֶה.</div>,
	closable: true,
}
let box = {
	dockbox: {
		mode: 'horizontal',
		children: [
			{
				tabs: [mainTab, mainTab2, { ...tab, id: 't4' }, { ...tab, id: 't5' }, {
					cached: true,
					title: "Morphology",
					content: <Morphology />,
					id: 'm1'
				}, {
						title: "Search",
						content: <SearchTerms />,
						id: 's1'
					}],
			},
		]
	},
	floatbox: {
		mode: 'float',
		children: [
			{
				id: 'floating_windows',
				tabs: [mainTab3],
			}
		]
	},
	windowbox: {
		mode: window,
		children: []
	},
}

const savedLayout = {
	"dockbox": {
		"id": "+13",
		"size": 200,
		"mode": "horizontal",
		"children": [
			{
				"id": "+14",
				"size": 270,
				"tabs": [
					{ "id": "m1" },
					{ "id": "s1" }
				],
				"activeId": "m1"
			},
			{
				"id": "+11",
				"size": 1092,
				"mode": "vertical",
				"children": [
					{
						"id": "+1",
						"size": 280,
						"mode": "horizontal",
						"children": [
							{ "id": "+5", "size": 551, "tabs": [{ "id": "chTab1" }], "activeId": "chTab1" },
							{ "id": "+9", "size": 537, "tabs": [{ "id": "chTab2" }, { "id": "chTab3" }], "activeId": "chTab2" }
						]
					}, {
						"id": "+12",
						"size": 120,
						"tabs": [
							{ "id": "t4" },
							{ "id": "t5" }
						],
						"activeId": "t4"
					}
				]
			}]
	},
	"floatbox": {
		"id": "+6",
		"size": 1,
		"mode": "float",
		"children": []
	},
	"windowbox": {
		"id": "+7",
		"size": 1,
		"mode": "window",
		"children": []
	},
	"maxbox": {
		"id": "+8",
		"size": 1,
		"mode": "maximize",
		"children": []
	}
}

function createTab() {
	let tabId = ChapterTabManager.createChapterTab({
		reference: {
			book: "Romans",
			chapter: 8
		},
		modules: ["Nestle1904"]
	})
	return {
		closable: true,
		cached: false,
		title: <ChapterTabTitle id={tabId} />,
		content: <Chapter id={tabId} />,
		id: tabId
	}
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.dockLayoutRef = React.createRef()
	}

	componentDidMount() {
		// this.setState(docklayout: box)
		this.dockLayoutRef.current.loadLayout(savedLayout)
	}
	componentWillUnmount() {
		const a = this.dockLayoutRef.current.saveLayout()
		console.log(a)
	}
	render() {
		return <>
			{/* <Header addWindow={() => {
				// Can't figure out how to make this work
				throw ("Not yet functional")
				const newTab = createTab()
				console.log(newTab)
				this.dockLayoutRef.current.dockMove(newTab, 'floating_windows', 'float')
			}} /> */}
			<DockLayout
				ref={this.dockLayoutRef}
				// style={{ "height": "calc(100vh - 48px)" }}
				style={{ "height": "100vh " }}
				defaultLayout={box}
				dropMode='edge'
			/>
		</>
	}
}

ReactDOM.render(<App />,
	document.querySelector("#App")
)

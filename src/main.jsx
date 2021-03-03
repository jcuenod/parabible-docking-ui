import React from "react"
import ReactDOM from "react-dom"
import { DockLayout } from "rc-dock"
import "rc-dock/dist/rc-dock.css"

import Header from "./components/Header.jsx"
import Chapter from "./components/Chapter.jsx"
import ChapterTabTitle from "./components/ChapterTabTitle.jsx"
import Morphology from "./components/Morphology.jsx"

window.chapterTabs = {
	chTab1: {
		reference: {
			book: "Genesis",
			chapter: 1
		}
	},
	chTab2: {
		reference: {
			book: "Genesis",
			chapter: 2
		}
	}
}

let mainTab = {
	closable: false,
	cached: true,
	title: <ChapterTabTitle id={"chTab1"} />,
	content: <Chapter id={"chTab1"} />,
	id: 'chTab1'
}
let mainTab2 = {
	closable: false,
	cached: true,
	title: <ChapterTabTitle id={"chTab2"} />,
	content: <Chapter id={"chTab2"} />,
	id: 'chTab2'
}
let tab = {
	title: 'Tab',
	content: <div>The MT has simply “and Cain said to Abel his brother,” omitting Cain’s words to Abel. It is possible that the elliptical text is original. Perhaps the author uses the technique of aposiopesis, “a sudden silence” to create tension. In the midst of the story the narrator suddenly rushes ahead to what happened in the field. It is more likely that the ancient versions (Smr, LXX, Vulgate, and Syriac), which include Cain’s words, “Let’s go out to the field,” preserve the original reading here. After writing אָחִיו (ʾakhiyv, “his brother”), a scribe’s eye may have jumped to the end of the form בַּשָׂדֶה (bassadeh, “to the field”) and accidentally omitted the quotation. This would be an error of virtual homoioteleuton. In older phases of the Hebrew script the sequence יו (yod-vav) on אָחִיו is graphically similar to the final ה (he) on בַּשָׂדֶה.</div>,
	closable: true,
};
let box = {
	dockbox: {
		mode: 'horizontal',
		children: [
			{
				mode: 'vertical',
				children: [
					{
						tabs: [{ title: "Morphology", content: <Morphology />, id: 'm1' }, { title: "Search", content: <div>search terms...</div>, id: 's1' }],
					},
					{
						tabs: [mainTab2, { ...tab, id: 't4' }, { ...tab, id: 't5' }]
					}
				]
			},
			{
				tabs: [mainTab],
			},
		]
	}
};

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
							{ "id": "+9", "size": 537, "tabs": [{ "id": "chTab2" }], "activeId": "chTab2" }
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
			<Header />
			<DockLayout
				ref={this.dockLayoutRef}
				style={{ "height": "calc(100vh - 48px)" }}
				defaultLayout={box}
				dropMode='edge'
			/>
		</>
	}
}

ReactDOM.render(<App />,
	document.querySelector("#App")
)

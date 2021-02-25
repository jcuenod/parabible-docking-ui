import React from "react"
import ReactDOM from "react-dom"
import { DockLayout } from "rc-dock"
import "rc-dock/dist/rc-dock.css"
import Header from "./components/Header.jsx"
import Chapter from "./components/Chapter.jsx"
import Morphology from "./components/Morphology.jsx"

let mainTab = {
	closable: false,
	title: "Main",
	content: <Chapter />,
	id: 'tMain'
}
let mainTab2 = {
	closable: false,
	title: "Main",
	content: <Chapter temp="sdf" />,
	id: 'tMain2'
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

ReactDOM.render(
	<>
		<Header />
		<DockLayout defaultLayout={box} dropMode='edge' style={{ "height": "calc(100vh - 48px)" }} />
	</>,
	document.querySelector("#App")
)

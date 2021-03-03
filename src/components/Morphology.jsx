import React, { useState, useEffect } from "react"
import abbreviations from "../data/abbreviations.json"
import ActiveWid from "./ActiveWid"
import fetchWord from "../util/word"

const k = key => abbreviations["categories"][key]
const v = (key, value) =>
	key in abbreviations && value in abbreviations[key]
		? abbreviations[key][value]
		: value

const DetailsTable = ({ details, selected, onClick }) => (
	<div className="table p-2 w-full text-gray-700">
		<div className="table-row-group">

			{Object.keys(details).map((key) => (
				<div
					key={key}
					className={"table-row cursor-pointer rounded " + (selected.includes(key) ? "bg-blue-500 text-gray-50 hover:bg-blue-600 hover:text-white" : "hover:bg-blue-200 hover:text-gray-900")}
					onClick={() => onClick(key)}
				>
					<div className="table-cell px-2 py-1 align-middle font-extrabold text-xs uppercase">{k(key)}</div>
					<div className="table-cell pr-2 py-1 align-middle">{v(key, details[key])}</div>
				</div>
			))}
		</div>
	</div>
)

const Morphology = () => {
	const [selected, setSelected] = useState([])
	const [activeWid, setActiveWid] = useState(ActiveWid.activeWid)
	const [details, setDetails] = useState(false)
	useEffect(
		() => {
			console.log("MORPH: subscribe")
			ActiveWid.subscribe((wid) => {
				console.log("MORPH: trigger")
				if (wid === activeWid) return
				fetchWord({ wid }).then((data) => {
					setSelected([])
					setDetails(data.results)
					setActiveWid(wid)
				})
			})
		}, []
	)
	if (details === false) {
		return <div>Nothing to see here</div>
	}
	return <DetailsTable
		details={details}
		selected={selected}
		onClick={key => {
			if (selected.includes(key)) {
				setSelected(selected.filter(k => k !== key))
				return
			}
			setSelected([key, ...selected])
		}}
	/>
}
export default Morphology

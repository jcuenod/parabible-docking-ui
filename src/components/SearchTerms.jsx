import React, { useState, useEffect } from "react"
import SearchTermManager from "../util/SearchTermManager.js"
import SearchResults from "./SearchResults"

const b64EncodeUnicode = (str) => {
	// first we use encodeURIComponent to get percent-encoded UTF-8,
	// then we convert the percent encodings into raw bytes which
	// can be fed into btoa.
	return btoa(
		encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
			String.fromCharCode(`0x${p1}`)
		)
	)
}
let previousQuery = ""
let previousCount = null
const doResultCount = () => new Promise(async (resolve, reject) => {
	const searchTerms = SearchTermManager.searchTerms.map((term, i) => ({
		data: Object.fromEntries(term.map(({ key, value }) => [key, value])),
		inverted: false,
		uid: i,
	}))
	const query = {
		searchTerms,
		treeNodeType: "rid",
	}
	const urlEncoded = b64EncodeUnicode(JSON.stringify(query))
	if (urlEncoded === previousQuery) {
		resolve(previousCount)
		return
	}

	const response = await fetch(
		"http://localhost:8080/api/v2/termSearchCount/" + urlEncoded
	)
	const results = await response.json()
	console.log("RESULT_COUNT", results)
	resolve(results.data.count)
	previousQuery = urlEncoded
	previousCount = results.data.count
})
const doSearch = ({ pageNumber, pageSize }) => new Promise(async (resolve, reject) => {
	const searchTerms = SearchTermManager.searchTerms.map((term, i) => ({
		data: Object.fromEntries(term.map(({ key, value }) => [key, value])),
		inverted: false,
		uid: i,
	}))
	const query = {
		searchTerms,
		treeNodeType: "rid",
		pageNumber,
		pageSize,
	}
	const urlEncoded = b64EncodeUnicode(JSON.stringify(query))
	const response = await fetch(
		"http://localhost:8080/api/v2/termSearch/" + urlEncoded
	)
	const results = await response.json()
	console.log("RESULTS", results)
	resolve(results.data)
})

class SearchTerms extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			terms: SearchTermManager.searchTerms,
			pageOfResults: [],
			awaitingPageOfResults: false,
			resultCount: 0,
			awaitingResultCount: false,
			pageNumber: 0,
			pageSize: 10,
		}
		SearchTermManager.subscribe((newTerms) => {
			console.log("hi there, I'm refreshing...")
			this.setState({ terms: newTerms })
		})
	}
	updatePageNumber(direction) {
		if (!direction)
			return

		const newPageNumber = Math.floor(this.state.pageNumber + direction)
		if (newPageNumber < 0) {
			this.setState({ pageNumber: 0 })
		}
		else if (newPageNumber > this.state.resultCount / this.state.pageSize) {
			const max = Math.floor(this.state.resultCount / this.state.pageSize)
			this.setState({ pageNumber: max })
		}
		else {
			this.setState({ pageNumber: newPageNumber })
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		console.log("update!", nextState.pageNumber !== this.state.pageNumber)
		if (nextState.pageNumber !== this.state.pageNumber || nextState.pageSize !== this.state.pageSize) {
			this.updateResults(nextState.pageNumber, nextState.pageSize)
		}
		return true
	}
	async updateResults(pageNumber, pageSize) {
		this.setState({ awaitingPageOfResults: true, awaitingResultCount: true, pageNumber })
		const results = doSearch({ pageNumber, pageSize })
		results.then(data => {
			this.setState({ pageOfResults: data, awaitingPageOfResults: false })
		})
		const resultCount = doResultCount()
		resultCount.then(count => {
			this.setState({ resultCount: count, awaitingResultCount: false })
		})
	}
	render() {
		return (
			<div>
				{this.state.terms.map((term, i) => (
					<ul key={i} className="m-1 p-2 bg-gray-200 rounded">
						{term.map(({ key, value }) => (
							<li key={key}>
								{key}: {value}
							</li>
						))}
						<button onClick={() => SearchTermManager.delete(i)}>remove</button>
					</ul>
				))}
				<button
					className="p-2 font-medium text-xl bg-gray-200 hover:bg-blue-400 active:bg-blue-600 rounded text-center hover:text-white active:text-white"
					onClick={() => this.updateResults(0, this.state.pageSize)}
				>
					Do search!
				</button>
				<br />
				<input type="text" value={this.state.pageSize} onChange={(e) => this.setState({ pageSize: e.target.value })}></input>
				<button
					className="p-2 font-bold text-lg hover:bg-gray-200 cursor-pointer"
					onClick={() => this.updatePageNumber(-1)}
				>←</button>
				<span className="p-2 w-10 font-bold">
					{this.state.pageNumber + 1} / {Math.floor(this.state.resultCount / this.state.pageSize) + 1}
				</span>
				<button
					className="p-2 font-bold text-lg hover:bg-gray-200 cursor-pointer"
					onClick={() => this.updatePageNumber(+1)}
				>→</button>
				<div>{this.state.awaitingResultCount ? "Looking up number of results..." : "Number of Results: " + this.state.resultCount}</div>
				<div>{this.state.awaitingPageOfResults
					? "Looking up results..."
					: <SearchResults searchResults={this.state.pageOfResults} />}</div>
			</div>
		)
	}
}
export default SearchTerms

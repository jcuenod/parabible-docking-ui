import React from "react"

const referenceFromId = id => window.chapterTabs[id].reference
const chapterTextFromReference = ({ book, chapter }) => `${book} ${chapter}`
const chapterTitleTextFromId = id => chapterTextFromReference(referenceFromId(id))

export default ({ id }) =>
    <div>{chapterTitleTextFromId(id)}</div>

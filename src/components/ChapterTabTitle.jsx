import React from "react"
import ChapterTabManager from "../util/ChapterTabManager.js"

const referenceFromId = id => ChapterTabManager.getTab(id).reference
const chapterTextFromReference = ({ book, chapter }) => `${book} ${chapter}`
const chapterTitleTextFromId = id => chapterTextFromReference(referenceFromId(id))

export default ({ id }) =>
    <div>{chapterTitleTextFromId(id)}</div>

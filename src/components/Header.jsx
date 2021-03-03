import React from "react"

const bookIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>

const Header = () =>
    <div
        className="bg-gray-100 flex p-1"
        style={{ height: "48px" }}
    >
        <div className="flex-1"></div>
        <div className="flex-0 
        cursor-pointer
        text-gray-600 hover:text-gray-900
        items-center p-2 rounded
        hover:bg-gray-300
        font-bold
        flex flex-row
        ">
            <div className="flex-0 flex items-center">
                {bookIcon}
            </div>
            <div className="flex-0 px-1">
                Genesis 1
            </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex-0 
        cursor-pointer
        text-gray-600 hover:text-gray-800 
        items-center p-2 rounded 
        hover:bg-gray-300 
        hover:font-bold
        ">
            Hover
        </div>
    </div>

export default Header

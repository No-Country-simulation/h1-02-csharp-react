import { useState } from "react"

const ExpandableList = ({ items, maxVisible, renderItemCollapsed, renderItemExpanded, title, bgColor, extended }) => {
    const [expanded, setExpanded] = useState(extended ? true : false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const visibleItems = expanded ? items : items.slice(0, maxVisible);

    return (
        <div className={`backdrop-blur ${bgColor? bgColor : 'bg-[rgba(253,239,244,0.1)]' } rounded-3xl py-2 px-4 w-full mb-4 shadow-custom`}>
            <div className="flex justify-between items-center">
                <h2 className="py-2 font-semibold">{title}</h2>
                {expanded &&
                <button onClick={handleExpandClick} className="flex items-center justify-center w-6 h-6 rounded-full bg-[rgba(253,239,244,0.4)] shadow-custom hover:shadow-none"> - </button>}
            </div>
            <ul className={`flex ${expanded ? 'flex-col' : 'flex-row'} gap-2 mb-2`}>
                {visibleItems.map((item, index) => (
                <li key={index}>
                {expanded ? renderItemExpanded(item) : renderItemCollapsed(item)}
                </li>
                ))}
                <li>
                    {!expanded &&
                <button onClick={handleExpandClick} className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(253,239,244,0.4)] shadow-custom hover:shadow-none">
                    +
                </button>}
                </li>
            </ul>      
        </div>
    )
}

export default ExpandableList

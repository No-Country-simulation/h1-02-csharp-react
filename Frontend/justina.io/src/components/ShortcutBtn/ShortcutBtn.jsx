import { Link } from "react-router-dom"

const ShortcutBtn = ({ icon, title, to, onClick }) => {
    const content = (
        <div className="flex items-center justify-center gap-2 px-4 py-8 text-sm rounded-3xl hover:bg-[rgba(214,86,131,0.2)] font-semibold">          
          <img src={icon} alt={title}/>
          <span>{title}</span>
        </div>
    )
    
    if (to) {
        return (
          <Link to={to} className="no-underline text-black w-full backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom">
            {content}
          </Link>
        )
    }
    return (
        <button onClick={onClick} className="no-underline text-black w-full backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom">
            {content}
        </button>
    )
}

export default ShortcutBtn
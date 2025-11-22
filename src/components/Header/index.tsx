import { memo } from "react"
import './header.css'
const Header=({text="LifeSight Machine Coding",customStyles={}}:{text?:string;customStyles?:any})=>{
    return(
        <div className="header-container" style={customStyles}>
            <h2>{text}</h2>
        </div>
    )
}

export default memo(Header)
import type { ReactNode } from "react"
import Header from "../Header"
import Sidebar from "../Sidebar"
import './layout.css'
const Layout=({children}:{children:ReactNode})=>{
    return (
        <div className="layout-container">
            <Header/>
            <Sidebar/>
            <div className="main-container">
                {children}
            </div>
        </div>
    )
}
export default Layout
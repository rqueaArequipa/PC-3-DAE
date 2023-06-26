import { Container } from "react-bootstrap"
import Footer from "./Footer"
import NavBar from "./NavBar"
import SideBar from "./SideBar"

function Layout({ children }) {
    return (
        <>
        <NavBar/>
            <div id="layoutSidenav">
                    <SideBar />
                    
                <div id="layoutSidenav_content">
                    <div className="layoutSidenav card">
                    <main>
                        {children}
                    </main>
                    </div>
                        <Footer/>
                </div>
            </div>
        </>
    )
}

export default Layout
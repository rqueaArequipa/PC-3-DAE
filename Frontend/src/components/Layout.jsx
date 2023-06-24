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
                    <main>
                        {children}
                    </main>
                        <Footer/>
                </div>
            </div>
        </>
    )
}

export default Layout
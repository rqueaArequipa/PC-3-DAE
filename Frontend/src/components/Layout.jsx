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
                    <footer className="py-4 bg-light mt-auto">
                        <Footer/>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default Layout
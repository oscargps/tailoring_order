import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const Layout = () => {

    return (
        <div className="flex flex-row h-full min-h-screen">
            <Header />
            <div className="p-4 w-full">
                <Outlet />
            </div>
        </div>
    )

}

export default Layout
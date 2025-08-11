import { Outlet } from "react-router-dom";
import NavBarr from './NavBarr'
import Footer from "./Footer";
import MobileNavBar from "./MobileNavBar";


function MainLayout(){


    return(
        <div className="flex flex-col flex-grow">
            <div className="md:hidden">
                <MobileNavBar/>
            </div>
            <div className="flex flex-col min-h-screen justify-between">
                <div className="hidden md:flex">
                    <NavBarr/>
                </div>

                <div className="p-4 mt-18">
                    <Outlet/>
                </div>

                <Footer/>
            </div>
        </div>
    )
}

export default MainLayout;
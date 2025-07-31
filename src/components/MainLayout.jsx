import { Outlet } from "react-router-dom";
import NavBarr from './NavBarr'
import Footer from "./Footer";


function MainLayout(){


    return(
        <div>
            <NavBarr/>
            <div className="p-4">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}

export default MainLayout;
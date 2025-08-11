
import { BellRing, Menu, Rss, X, Youtube } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";



function MobileNavBar(){

    const [isOpen, setIsOpen] = useState(false);

    function handleOpen(){
        setIsOpen(false)
    }



    return(
        <div className="md:hidden bg-slate-800 text-white fixed top-0 w-full z-50">
            <div className="flex justify-between items-center p-4 bg-maroon text-white">
                <Link to="/" className='flex items-center '>
                    <p className='text-xl font-bold text-gray-100'>Gist <span className='arena text-2xl'>Arena</span></p>
                    <Rss size={25} className='text-yellow-500'/>
                </Link>

                <div className="flex items-center gap-2 p-2">
                    <Link to="/">
                        <BellRing size={25} className='hover:text-yellow-400 hover:scale-110 duration-300 cursor-pointer'/>
                    </Link>
                    <Link to="/">
                        <Youtube size={25} className='hover:text-red-500 hover:scale-110 duration-300 cursor-pointer'/>
                    </Link>
                    <button onClick={() => setIsOpen(!isOpen)} className=" text-white">
                        {
                            isOpen ? <X size={24} className="cursor-pointer"/> : <Menu size={24} className="cursor-pointer"/>
                        }
                    </button>
                </div>
                {
                    isOpen && (
                        <div className="fixed inset-0 backdrop-blur-xl z-50 pt-16 text-white">
                            <button onClick={()=> setIsOpen(false)} className="absolute top-4 right-4 p-2 text-white">
                                <X size={24} className="cursor-pointer"/>
                            </button>


                            {/* links */}
                            <div className="text-lg font-semibold flex flex-col gap-4 items-center text-white">
                                <Link to="/" onClick={() => setIsOpen(false)} className="navlink">
                                    <p>Home</p>
                                    <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
                                </Link>
                                <Link to="/news-list" onClick={() => setIsOpen(false)} className="navlink">
                                    <p>News</p>
                                    <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
                                </Link>
                                <Link to="/about" onClick={() => setIsOpen(false)} className="navlink">
                                    <p>About</p>
                                    <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
                                </Link>
                                <Link to="/contact" onClick={() => setIsOpen(false)} className="navlink">
                                    <p>Contact</p>
                                    <hr className='bg-yellow-400 w-4/5 mx-auto h-[2px] rounded-full border-none  duration-500'></hr>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}


export default MobileNavBar;
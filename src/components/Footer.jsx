import { Link } from "react-router-dom";
import {Facebook, Instagram, Rss, Twitter, Youtube} from 'lucide-react'


function Footer(){


    return(
        <div className="bg-black flex flex flex-col gap-4">
            <div className="p-10 lg:grid grid-cols-4 md:grid flex flex-col text-white gap-5">
                <div>
                    <Link to="/" className='flex items-center'>
                        <p className='text-xl font-bold '>Gist Arena</p>
                        <Rss size={25} className='text-yellow-500'/>
                    </Link>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi beatae ratione aut magni fuga eaque.</p>
                </div>

                {/* Links */}
                <div className="flex flex-col  w-20">
                    <Link to="/" className="hover:text-gray-600 duration-300 hover:scale-110">Home</Link>
                    <Link to="/news-list" className="hover:text-gray-600 duration-300 hover:scale-110">News</Link>
                    <Link to="/about" className="hover:text-gray-600 duration-300 hover:scale-110">About</Link>
                    <Link to="/contact" className="hover:text-gray-600 duration-300 hover:scale-110">Contact</Link>
                </div>

                <div className="flex flex-col w-40">
                    <Link to="/" className="hover:text-gray-600 duration-300 hover:scale-110">Terms & Conditions</Link>
                    <Link to="/" className="hover:text-gray-600 duration-300 hover:scale-110">Categories</Link>
                    <Link to="/" className="hover:text-gray-600 duration-300 hover:scale-110">Our Authors</Link>
                    <Link to="/" className="hover:text-gray-600 duration-300 hover:scale-110">Advertise with us</Link>
                    <Link to="/" className="hover:text-gray-600 duration-300 hover:scale-110">Work for us</Link>
                </div>

                {/* Social Media */}
                <div className="flex md:justify-end items-center gap-5">
                    <Link to="/">
                        <Instagram size={25} className="hover:text-yellow-500 hover:scale-110 duration-300"/>
                    </Link>
                    <Link to="/">
                        <Youtube size={25} className="hover:text-red-500 hover:scale-110 duration-300"/>
                    </Link>
                    <Link to="/">
                        <Twitter size={25} className="hover:text-blue-500 hover:scale-110 duration-300"/>
                    </Link>
                    <Link to="/">
                        <Facebook size={25} className="hover:text-blue-400 hover:scale-110 duration-300"/>
                    </Link>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-8 p-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Gist Arena. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer;
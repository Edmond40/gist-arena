


import { ChevronUp, Clock, Clock10, Mail, MapPin } from 'lucide-react'
import React from 'react'

export default function Contact() {

  function handleSubmit(e){
    e.preventDefault();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-yellow-400" id='Contact'>
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('./assets/images/bb6.jpg')] bg-1 opacity-30">
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            <span className="text-gray-100 trend">Contact</span>
            <span className='flex justify-center gap-1'>
              <h1 className="text-gray-800 md:text-4xl font-bold" data-aos="fade-left">Gist </h1><span className='bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-300 arena' data-aos="fade-right">Arena</span>
            </span>
          </h1>
          <p className="text-xl libertinus-serif-semibold-italic text-gray-900 max-w-3xl mx-auto mb-12" data-aos="fade-down">
            We are ready to serve you with the rightful Insights and Entertainment news always
          </p>
        </div>
      </div>

      <section className='bg-white md:grid grid-cols-2 flex flex-col gap-5 py-16 md:px-10'>
        <div>
          <div className='shadow-md p-8 flex flex-col gap-4' data-aos="fade-up">
            <h1 className='md:text-2xl text-gray-700 font-semibold'>Contact Information</h1>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-1'>
                <MapPin size={25} className='text-yellow-500'/>
                <p className='text-gray-600 libertinus-serif-regular-italic'>Tanoso, Kumasi - Ghana</p>
              </div>
              <div className='flex items-center gap-1'>
                <Mail size={25} className='text-yellow-500'/>
                <p className='text-gray-600 libertinus-serif-regular-italic'>gistarena@gmail.com</p>
              </div>
              <div className='flex items-center gap-1'>
                <Clock10 size={25} className='text-yellow-500'/>
                <p className='text-gray-600 libertinus-serif-regular-italic'>Monday - Sunday</p>
              </div>
              <div className='flex items-center gap-1'>
                <Clock size={25} className='text-yellow-500'/>
                <p className='text-gray-600 libertinus-serif-regular-italic'>7 : 00 AM - 12 : 00 AM</p>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white shadow-md flex flex-col gap-5' data-aos="fade-right">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="" className="w-full p-2 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 duration-300"/>
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="" className="w-full p-2 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 duration-300"/>
                </div>

                <div>
                    <label htmlFor="subject">Subject</label>
                    <input type="text" name="subject" id="" className="w-full p-2 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 duration-300"/>
                </div>

                <div>
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="" rows={5} className="w-full shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 duration-300"></textarea>
                </div>

                <button type="submit" className="w-full p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 duration-300">Send Message</button>
            </form>
        </div>
      </section>

      <a href="#Contact" className="fixed text-white bottom-5 right-5 bg-blue-400 z-10 rounded-full hover:rotate-180 duration-300">
        <ChevronUp size={30} className='text-white'/>
      </a>
    </div>
  )
}

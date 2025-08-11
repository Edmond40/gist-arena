"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { news } from "../pages/NewsList"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components.jsx/carousel";
import { Card, CardContent } from "../components.jsx/card";
import { Link } from "react-router-dom";

function NewsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className=" max-w-6xl mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {news.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex h-96 items-center justify-center rounded-xl overflow-hidden w-full flex-col relative">
                  <img src={item.image} alt={item.title} className="md:w-full h-full object-cover" />
                  <div className="flex flex-col gap-2 absolute bottom-0 left-0 md:top-52 top-38 right-0 p-4 text-gray-100  inset-0 bg-gradient-to-t from-black/100 to-transparent">
                    <div className="flex flex-col justify-between items-start">
                      <span className="text-2xl font-semibold">{item.title}</span>
                      <span className="text-lg font-semibold">{item.date}</span>
                      <Link to={`/news-detail/${item.id}`} className='bg-yellow-400 text-white rounded-md hover:bg-yellow-500 p-1.5'>Read More →</Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="hidden"/>
      <CarouselNext className="hidden"/> */}
    </Carousel>
  )
}

export default NewsCarousel;
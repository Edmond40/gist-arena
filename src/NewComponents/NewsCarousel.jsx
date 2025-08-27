"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components.jsx/carousel";
import { Card, CardContent } from "../components.jsx/card";
import { Link } from "react-router-dom";
import { PostsAPI } from "../lib/api";

function NewsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    (async () => {
      try {
        const posts = await PostsAPI.list({ published: true, sortBy: 'publishedAt', order: 'desc' })
        setItems((posts || []).slice(0, 12))
      } catch (e) {
        setError('Failed to load posts')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Carousel
      plugins={[plugin.current]}
      className=" max-w-6xl mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {loading && (
          <CarouselItem>
            <div className="p-1"><Card><CardContent className="h-40 flex items-center justify-center">Loading...</CardContent></Card></div>
          </CarouselItem>
        )}
        {!loading && error && (
          <CarouselItem>
            <div className="p-1"><Card><CardContent className="h-40 flex items-center justify-center text-red-600 text-sm">{error}</CardContent></Card></div>
          </CarouselItem>
        )}
        {!loading && !error && items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex h-96 items-center justify-center rounded-xl overflow-hidden w-full flex-col relative">
                  {item.heroImageUrl && (<img src={item.heroImageUrl} alt={item.title} className="md:w-full w-82 h-full object-cover" />)}
                  <div className="flex flex-col gap-2 absolute bottom-0 left-0 top-54 right-0 p-4 text-gray-100  inset-0 bg-gradient-to-t from-black/100 to-transparent">
                    <div className="flex flex-col justify-between items-start">
                      <span className="text-2xl font-semibold line-clamp-2">{item.title}</span>
                      <span className="text-lg font-semibold">{item.publishedAt ? new Date(item.publishedAt).toLocaleString() : ''}</span>
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
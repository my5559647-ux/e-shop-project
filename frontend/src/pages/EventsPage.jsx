import React from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Events/EventCard'
import Footer from '../components/Layout/Footer'

const EventsPage = () => {
  return (
    <div className="w-full">
        <Header activeHeading={4} />
        <div className="w-11/12 mx-auto py-10">
            {/* Abhi ke liye hum 2 cards dikha rahe hain */}
            <h1 className="text-[25px] font-[600] font-Roboto pb-5">Current Events</h1>
            <EventCard active={true} data={{
                name: "Iphone 14 Pro Max Special Deal",
                image_Url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
                description: "Limited time offer on the latest iPhone. Get the best performance and camera quality.",
                originalPrice: 1099,
                discountPrice: 999,
                total_sell: 120
            }} />
        </div>
        <Footer />
    </div>
  )
}

export default EventsPage;
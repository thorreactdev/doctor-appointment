import React from 'react'

const Banner = () => {
  return (
    <section className='max-w-7xl mx-auto bg-[#4f46e5] p-10 my-10'>
        <section className="relative bg-cover bg-center h-[60vh]" style={{ backgroundImage: 'url(/research.jpg)' }}>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-gray-900/50"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
    <h1 className="text-4xl md:text-6xl font-bold">Book an Appointment with Top Doctors</h1>
    <p className="mt-4 text-lg md:text-xl">Quick and easy online booking for the best healthcare professionals.</p>

    {/* Call to Action Buttons */}
    <div className="mt-8 space-x-4">
      <a href="/book" className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 text-white font-semibold">Book Appointment Now</a>
      <a href="/explore" className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-blue-600 text-white font-semibold">Explore Doctors</a>
    </div>

    {/* Search Bar */}
    <div className="mt-12 w-full max-w-lg">
      <input type="text" placeholder="Search doctors by name, specialty, or location" className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none" />
    </div>
  </div>
</section>

 </section>
  )
}

export default Banner
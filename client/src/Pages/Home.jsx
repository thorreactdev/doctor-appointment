import React from 'react'
import LandingPage from './LandingPage'
import TopDoctors from '@/components/TopDoctors'
import Banner from '@/components/Banner'
import FAQ from '@/components/FAQ'

const Home = () => {
  return (
    <>
        <LandingPage/>
        <TopDoctors/>
        {/* <Banner/> */}
        <FAQ/>
    </>
  )
}

export default Home
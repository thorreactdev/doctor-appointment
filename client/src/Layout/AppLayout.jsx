import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "../components/Header.jsx";
import Scroll from '@/service/Scroll.jsx';
import Footer from '@/components/Footer.jsx';
import { Toaster } from '@/components/ui/toaster.jsx';

const AppLayout = () => {
  return (
    <>
    <Toaster/>
    <Scroll/>
    <header className='sticky top-0 left-0 z-20'>
        <Header/>
    </header>
    <main className='min-h-screen'>
        <Outlet/>
    </main>
    <footer className='bg-white shadow-lg p-10 '>
      <Footer/>
    </footer>
        </>
  )
}

export default AppLayout
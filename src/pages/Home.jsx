import React from 'react'
import Navbar from '../components/Navbar'
import UnderConstruction from '../components/UnderConstruction'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Navbar/>
      <UnderConstruction/>
      <Features/>
      <Pricing/>
      <Footer/>
    </>
  )
}

export default Home

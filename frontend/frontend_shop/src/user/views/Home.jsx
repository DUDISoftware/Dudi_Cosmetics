import React from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import TrendingProducts from '../components/TrendingProducts'
import OtherProducts from '../components/OtherProducts'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
        <Header/>
        <Banner/>
        <TrendingProducts/> 
        <OtherProducts/>
        <Testimonials/>
        <Footer/>
    </>

  )
}

export default Home
import React from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/HeroSection/HeroSection'
import Category from '../../components/Category/Category'
import HomePageProductCard from '../../components/HomePageProductCard/HomePageProductCard'
import Track from '../../components/Track/Track'
import Testimonial from '../../components/Testimonial/Testimonial'

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <Category />
      <HomePageProductCard />
      <Track />
      <Testimonial />
    </Layout>
  )
}

export default Home
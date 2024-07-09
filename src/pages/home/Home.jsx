import React from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/HeroSection/HeroSection'
import Category from '../../components/Category/Category'
import HomePageProductCard from '../../components/HomePageProductCard/HomePageProductCard'
import Track from '../../components/Track/Track'
import Testimonial from '../../components/Testimonial/Testimonial'
import { BeatLoader } from 'react-spinners'

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <Category />
      <HomePageProductCard />
      <Track />
      <Testimonial />
      {/* <BeatLoader color='#D81B60' /> */}
    </Layout>
  )
}

export default Home
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import Testimonials from '../../components/testimonials/testimonials'
import HeroSection from '../../components/herosection'
import AnimatedServices from '../../components/animatedService'
import USPSection from '../../components/usp'
import Collaboration from '../../components/collaboration'
const Home = () => {
   const navigate=useNavigate()
  return (
    <div className='bg-gray-100'>
   <HeroSection/>
   <Collaboration/>
   <USPSection/>
   <AnimatedServices/>
    <Testimonials/>
    </div>
  )
}

export default Home
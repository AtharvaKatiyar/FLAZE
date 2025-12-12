import React from 'react'
import { HeroGeometric } from "../components/ui/shadcn-io/ShapeLandingHero";
import Navbar from '../components/Navbar'
const Home = () => {
  return (
    <div>
        {/* <Navbar/> */}
        <HeroGeometric
                title1="Your Imagination,"
                title2="Minted"
                description="Create AI-powered NFTs, gift or sell them, and showcase your digital creativity."
        />
    </div>
  )
}

export default Home
import Head from 'next/head'
import Image from 'next/image'
import HeroSection from '../components/HeroSection/HeroSection'
import NFTItems from '../components/NFTCard/NFTItems'
import NFTStep from '../components/NFTStep/NFTStep'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
   <div>
      <HeroSection />
      <NFTStep />
      <NFTItems />
   </div>
  )
}

import Amenities from "@/components/home/Amenities"
import CommunityHighlights from "@/components/home/CommunityHighlights"
import Contact from "@/components/home/Contact"
import Features from "@/components/home/Featues"
import Footer from "@/components/home/Footer"
import Hero from "@/components/home/Hero"
import LifeAtGokuldham from "@/components/home/LifeAtGokuldham"
import Nav from "@/components/home/Nav"
import Notices from "@/components/home/Notices"
import Testimonials from "@/components/home/Testimonials"

const Home = () => {

  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <LifeAtGokuldham />
      <Amenities />
      <CommunityHighlights />
      <Notices />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

export default Home
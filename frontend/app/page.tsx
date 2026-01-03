import Amenities from "@/components/Amenities";
import CommunityHighlights from "@/components/CommunityHighlights";
import Contact from "@/components/Contact";
import Features from "@/components/Featues";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LifeAtGokuldham from "@/components/LifeAtGokuldham";
import Nav from "@/components/Nav";
import Testimonials from "@/components/Testimonials";

const Home = () => {

  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <LifeAtGokuldham />
      <Amenities />
      <CommunityHighlights />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
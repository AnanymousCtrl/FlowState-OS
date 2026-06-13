import useScrollSpy from "../hooks/useScrollSpy";
import Hero from '../home/Hero'
import About from '../home/About'
import Testomonial from '../home/MarqueeCards'
import Footer from '../home/Footer'

const Home = () => {
  useScrollSpy(["home", "about", "testimonials", "footer"]);
  return (
    <>
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="testimonials"><Testomonial /></section>
      <section id="footer"><Footer /></section>
    </>
  )
}

export default Home

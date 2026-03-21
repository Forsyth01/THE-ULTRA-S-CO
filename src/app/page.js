import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Categories from "@/components/sections/Categories";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import SpotifySection from "@/components/sections/SpotifySection";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Categories />
        <Products />
        <SpotifySection />
        <About />
      </main>
      <Footer />
    </>
  );
}

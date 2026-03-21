import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutContent from "@/components/sections/AboutContent";

export const metadata = {
  title: "About Us | The Ultra's Co",
  description: "Learn about our mission to create premium headwear for soccer culture.",
};

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}

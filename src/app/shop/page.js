import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShopContent from "@/components/sections/ShopContent";

export const metadata = {
  title: "Shop All | The Ultra's Co",
  description: "Browse our full collection of premium snapbacks, beanies, and bucket hats.",
};

export default function ShopPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <ShopContent />
      </main>
      <Footer />
    </>
  );
}

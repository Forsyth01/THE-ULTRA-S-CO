import { Anton, DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ScrollToTop from "@/components/utils/ScrollToTop";

const anton = Anton({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Ultra's Co — Headwear for the Culture",
  description: "Premium headwear built for the ultras, the fans, the faithful. Snapbacks, beanies & bucket hats",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-black text-white font-body antialiased">
        <Providers>
          <ScrollToTop />
          {children}
        </Providers>
      </body>
    </html>
  );
}

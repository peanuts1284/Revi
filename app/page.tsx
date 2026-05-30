import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Divider from "@/components/Divider";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <Features />
        <HowItWorks />
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}

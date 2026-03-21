import { FAQ } from "@/components/homepage/FAQ";
import { Hero } from "@/components/homepage/Hero";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { Pricing } from "@/components/homepage/Pricing";
import { ProtocolFormat } from "@/components/homepage/ProtocolFormat";
import { ResearchPreview } from "@/components/homepage/ResearchPreview";
import { TrustAnchors } from "@/components/homepage/TrustAnchors";
import { Footer } from "@/components/shared/Footer";
import { Nav } from "@/components/shared/Nav";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-eonic-bg text-eonic-text">
      <Nav />
      <Hero />
      <TrustAnchors />
      <HowItWorks />
      <ProtocolFormat />
      <ResearchPreview />
      <Pricing />
      <section className="px-5 py-16 text-center md:px-8">
        <div className="mx-auto max-w-3xl rounded-card border border-dashed border-eonic-border-active bg-eonic-teal/5 px-8 py-12">
          <p className="font-display text-3xl italic text-eonic-text">Eonic is in its founding protocol phase.</p>
          <p className="mt-4 text-lg leading-8 text-eonic-text-2">
            We&apos;re building with our first 500 users. People who want something better than what&apos;s out there and are
            willing to tell us if it&apos;s not working.
          </p>
        </div>
      </section>
      <FAQ />
      <Footer />
    </main>
  );
}

import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { LangFade } from "@/components/layout/LangFade";
import { SkipLink } from "@/components/layout/SkipLink";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Programs } from "@/components/sections/Programs";
import { Food } from "@/components/sections/Food";
import { Gallery } from "@/components/sections/Gallery";
import { News } from "@/components/sections/News";
import { Contacts } from "@/components/sections/Contacts";
import { ClipDefs } from "@/components/ui/Fun";

export default function HomePage() {
  return (
    <Providers>
      <ClipDefs />
      <SkipLink />
      <Header />
      <LangFade>
        <main id="main">
          <Hero />
          <About />
          <Programs />
          <Food />
          <Gallery />
          <News />
          <Contacts />
        </main>
        <Footer />
      </LangFade>
      <FloatingActions />
    </Providers>
  );
}

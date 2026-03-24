import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Framework } from "@/components/sections/framework";
import { Industries } from "@/components/sections/industries";
import { WhyUs } from "@/components/sections/why-us";
import { HowWeWork } from "@/components/sections/how-we-work";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Framework />
      <WhyUs />
      <Industries />
      <HowWeWork />
      <CtaBanner />
    </>
  );
}

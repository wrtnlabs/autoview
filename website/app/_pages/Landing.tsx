import { Stepper } from "../_components/landing/Stepper";
import { WelcomeSection } from "../_components/landing/WelcomeSection";
import Footer from "../_components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-w-[320px] flex flex-col justify-center">
      <WelcomeSection />

      {/* Playground */}
      <div className="p-2 rounded-4xl border border-zinc-700 flex flex-col gap-8 max-w-[1280px] mb-16 md:mb-52 mx-4 md:mx-20 lg:mx-auto">
        {/* @Shrimp */}
        <iframe
          className="aspect-video border border-zinc-700 rounded-3xl"
          src="https://www.youtube.com/embed/eEPmx_JZCkY"
        />
        <Stepper />
      </div>

      {/* Background */}
      <div className="absolute w-full h-full left-0 top-0 flex justify-between px-24 -z-1">
        <hr className="border-[#272727] border-l-[1px] h-full w-px" />
        <hr className="border-[#272727] border-l-[1px] h-full w-px" />
        <hr className="border-[#272727] border-l-[1px] h-full w-px" />
      </div>

      <div className="bg-[#030303] -z-10 absolute left-0 top-0 w-full h-full" />
      <Footer />
    </div>
  );
}

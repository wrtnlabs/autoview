import { Button } from "@/app/_components/common/button";
import Link from "next/link";

import { GithubIcon } from "../icons/Github";
import Image from "next/image";

export function WelcomeSection() {
  return (
    <div className="h-screen relative flex flex-col py-20 items-center justify-center overflow-hidden md:h-fit md:justify-start">
      <div className="relative w-[400px] h-[400px] aspect-square">
        <Image src="/autoview/logo.png" alt="logo" fill />
      </div>

      <section className="flex flex-col gap-4 z-10">
        <h1 className="text-[80px] font-semibold text-zinc-50">AutoView</h1>
        <p className="text-gray-300 text-xl text-center">
          AI-Powered Instant UI Generation
        </p>
      </section>

      <Link
        href="https://github.com/wrtnlabs/autoview"
        target="_blank"
        className="z-10 mt-8"
      >
        <Button variant="primary" className="w-full md:w-auto bg-white text-[#181818] hover:bg-white hover:text-[#181818]">
          Github <GithubIcon width={24} height={24} className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}

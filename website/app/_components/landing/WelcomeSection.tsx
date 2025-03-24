import { Button } from "@/app/_components/common/button";
import Link from "next/link";

import { GithubIcon } from "../icons/Github";

export function WelcomeSection() {
  return (
    <div className="h-screen relative flex flex-col py-20 items-center justify-center gap-[38px] overflow-hidden md:h-fit md:justify-start">
      <section className="flex flex-col gap-4 z-10">
        <h1 className="text-[80px] font-semibold text-zinc-50">AutoView</h1>
        <p className="text-gray-300 text-xl text-center">
          AI-Powered Instant UI Generation
        </p>
      </section>
      <Link
        href="https://github.com/wrtnlabs/autoview"
        target="_blank"
        className="z-10"
      >
        <Button variant="primary" className="w-full md:w-auto">
          Github <GithubIcon width={24} height={24} className="h-6 w-6" />
        </Button>
      </Link>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/autoview/welcome_bg.png"
        alt="background"
        className="w-[600px] absolute top-[50%] left-[50%] transform-[translate(-50%,-50%)] h-screen object-cover opacity-30 md:w-[800px] md:h-auto select-non md:top-[60px] md:transform-[translate(-50%,-60px)]"
      />
    </div>
  );
}

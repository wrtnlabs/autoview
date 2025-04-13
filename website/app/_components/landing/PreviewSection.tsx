"use client";

import { PreviewCard } from "../common/preview-card";
import Link from "next/link";


export function PreviewSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row md:justify-between w-full pb-[74px] md:pb-[120px]">
      <Link href="https://wrtnlabs.io/agentica">
        <PreviewCard
          title="Agentica"
          subtitle="Previous"
          image="/autoview/agentica.png"
          direction="left"
        />
      </Link>
      <Link href="https://wrtnlabs.io">
        <PreviewCard
          subtitle="Next"
          title="Agent OS"
          image="/autoview/agent-OS.png"
          direction="right"
        />
      </Link>
    </section>
  );
}

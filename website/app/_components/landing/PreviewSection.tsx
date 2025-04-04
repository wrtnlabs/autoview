"use client";

import { toast } from "react-toastify/unstyled";
import { PreviewCard } from "../common/preview-card";
import { Toast } from "../common/toast";
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
      <PreviewCard
        subtitle="Next"
        title="Agent OS"
        image="/autoview/agent-OS.png"
        direction="right"
        onClick={() => toast.info(<Toast message="This service will be available soon." />)}
      />
    </section>
  );
}

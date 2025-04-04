"use client";

import { toast } from "react-toastify/unstyled";
import { PreviewCard } from "../common/preview-card";
import { Toast } from "../common/toast";


export function PreviewSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row md:justify-between w-full pb-[74px] md:pb-[120px]">
      <PreviewCard
        href="https://wrtnlabs.io/agentica/"
        title="Agentica"
        subtitle="Previous"
        image="/autoview/agentica.png"
        direction="left"
      />
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

"use client";

import type * as IAutoView from "@autoview/interface";
import { renderComponent } from "@autoview/ui";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Transform = (input: unknown) => IAutoView.IAutoViewComponentProps;
type Random = () => unknown;

function NoSsrImpl({ children }: { children: any }) {
  return <>{children}</>;
}

const NoSsr = dynamic(() => Promise.resolve(NoSsrImpl), {
  ssr: false,
});

export default function Page() {
  const params = useParams();
  const [transform, setTransform] = useState<Transform | null>(null);
  const [random, setRandom] = useState<Random | null>(null);

  async function loadTransform(slug: string): Promise<void> {
    const { transform } = await import(`../../../transformers/${slug}.js`);
    setTransform(() => transform);
  }

  async function loadRandom(slug: string): Promise<void> {
    const { random } = await import(`../../../transformer-randoms/${slug}.js`);
    setRandom(() => random);
  }

  useEffect(() => {
    if (!("slug" in params) || typeof params.slug !== "string") {
      return;
    }

    void loadTransform(params.slug);
    void loadRandom(params.slug);
  }, [params]);

  if (transform === null || random === null) {
    return <div>Loading...</div>;
  }

  return renderComponent(transform(random()));
}

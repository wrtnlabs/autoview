"use client";

import type * as IAutoView from "@autoview/interface";
import { renderComponent } from "@autoview/ui";
import { useEffect, useState } from "react";

export interface AutoViewCompProps {
  index: number;
}

type Transform = (input: unknown) => IAutoView.IAutoViewComponentProps;
type Random = () => unknown;

export default function AutoViewComp({ index }: AutoViewCompProps) {
  const [transform, setTransform] = useState<Transform | null>(null);
  const [random, setRandom] = useState<Random | null>(null);

  async function loadTransform(index: number): Promise<void> {
    const { transform } = await import(`../../../transformers/${index}.js`);
    setTransform(() => transform);
  }

  async function loadRandom(index: number): Promise<void> {
    const { random } = await import(`../../../transformer-randoms/${index}.js`);
    setRandom(() => random);
  }

  useEffect(() => {
    void loadTransform(index);
    void loadRandom(index);
  }, [index]);

  useEffect(() => {
    const event = new Event("autoview-render-finished");
    document.dispatchEvent(event);
  }, [transform, random]);

  if (transform === null || random === null) {
    return (
      <div className="py-16">
        <p className="text-center text-lg">Loading...</p>
      </div>
    );
  }

  return <>{renderComponent(transform(random()))}</>;
}

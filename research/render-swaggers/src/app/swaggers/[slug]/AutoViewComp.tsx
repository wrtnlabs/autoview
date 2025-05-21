"use client";

import { Component, useEffect, useState } from "react";

export interface AutoViewCompProps {
  index: number;
}

interface ComponentProps {
  value: unknown;
}
type Random = () => unknown;

export default function AutoViewComp({ index }: AutoViewCompProps) {
  const [component, setComponent] = useState<Component<ComponentProps> | null>(
    null,
  );
  const [random, setRandom] = useState<Random | null>(null);

  async function loadTransform(index: number): Promise<void> {
    const { default: component } = await import(
      `../../../../../components/${index}.jsx`
    );
    setComponent(() => component);
  }

  async function loadRandom(index: number): Promise<void> {
    const { random } = await import(`../../../../../mock-data/${index}.js`);
    setRandom(() => random);
  }

  useEffect(() => {
    void loadTransform(index);
    void loadRandom(index);
  }, [index]);

  useEffect(() => {
    const event = new Event("autoview-render-finished");
    document.dispatchEvent(event);
  }, [component, random]);

  if (component === null || random === null) {
    return (
      <div className="py-16">
        <p className="text-center text-lg">Loading...</p>
      </div>
    );
  }

  const Comp = component;

  console.log(Comp);

  // @ts-ignore
  return <Comp {...random()} />;
}

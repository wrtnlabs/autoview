"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import AutoViewComp from "./AutoViewComp";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const currentIndex = Number(params.slug ?? "0");
  const [swaggerCount, setSwaggerCount] = useState(0);

  async function loadSwaggerCount() {
    console.log("Loading swagger count");
    const { swaggerCount } = await import("../../../swagger-count.json");
    console.log("Swagger count loaded", swaggerCount);

    if (0 <= currentIndex && currentIndex < swaggerCount) {
      setSwaggerCount(swaggerCount);
      return;
    }

    setSwaggerCount(0);
    router.replace("/swaggers/0");
  }

  useEffect(() => {
    void loadSwaggerCount();
  }, []);

  const handlePrev = useCallback(() => {
    let newIndex = currentIndex - 1;

    if (newIndex < 0) {
      newIndex = swaggerCount - 1;
    }

    router.replace(`/swaggers/${newIndex}`);
  }, [router, currentIndex, swaggerCount]);

  const handleNext = useCallback(() => {
    let newIndex = currentIndex + 1;

    if (swaggerCount <= newIndex) {
      newIndex = 0;
    }

    router.replace(`/swaggers/${newIndex}`);
  }, [router, currentIndex, swaggerCount]);

  const handleIndexChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newIndex = Number(e.target.value);

      if (isNaN(newIndex)) {
        return;
      }

      if (newIndex < 0 || swaggerCount <= newIndex) {
        return;
      }

      router.replace(`/swaggers/${newIndex}`);
    },
    [router, swaggerCount],
  );

  return (
    <section className="mx-auto max-w-[512px] px-4 py-8 flex flex-col gap-4">
      <header>
        <h1 className="text-2xl text-center">AutoView Swagger Testbed</h1>
      </header>
      <nav className="flex flex-row items-center justify-center gap-4">
        <button
          className="rounded-md border px-4 py-2 cursor-pointer"
          onClick={handlePrev}
        >
          Prev
        </button>
        <input
          type="text"
          placeholder="Swagger Index"
          className="text-center rounded-md border px-4 py-2"
          value={currentIndex}
          onChange={handleIndexChange}
        />
        <button
          className="rounded-md border px-4 py-2 cursor-pointer"
          onClick={handleNext}
        >
          Next
        </button>
      </nav>
      <main className="flex flex-col gap-4">
        <AutoViewComp index={currentIndex} />
      </main>
    </section>
  );
}

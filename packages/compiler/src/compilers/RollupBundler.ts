import type { RollupBuild, rollup as RollupFunction } from "rollup";
import { VariadicSingleton } from "tstl";

export namespace RollupBundler {
  export const build = async (
    rollup: typeof RollupFunction,
    script: string,
  ): Promise<string> => {
    console.log("RollupBundle.build()", script);
    const modules: Record<string, string> = {
      "./src/index.js": script,
    };
    const builder: RollupBuild = await rollup({
      input: "./src/index.js",
      plugins: [
        {
          name: "virtual",
          resolveId(id) {
            console.log(`resolvId(${JSON.stringify(id)})`);
            if (id in modules) return id;
            return new URL(id, "https://esm.sh").href;
          },
          load(id) {
            console.log(`load(${JSON.stringify(id)})`);
            if (id in modules) return modules[id];
            return esm.get(id);
          },
        },
      ],
    });

    const { output } = await builder.generate({
      format: "cjs",
    });
    const bundled: string | undefined = output[0]?.code;
    if (!bundled?.length) throw new Error("Failed to bundle.");
    return bundled;
  };
}

const esm = new VariadicSingleton(async (url: string) => {
  console.log("esm.get()", url, reformUrl(url));
  const response: Response = await fetch(reformUrl(url));
  const text: string = await response.text();
  return text;
});

const reformUrl = (url: string): string => {
  const elements: string[] = url.split("https://esm.sh/")[1]!.split("/");
  if (elements.length === 0) return url;
  else if (elements[0]!.indexOf("@") > 0) return url;

  const library: string = elements[0]!.startsWith("@")
    ? `${elements[0]}/${elements[1]}`
    : elements[0]!;
  const path: string = [
    library,
    ...elements.slice(library.startsWith("@") ? 2 : 1),
  ].join("/");

  return `https://esm.sh/${path}`;
};

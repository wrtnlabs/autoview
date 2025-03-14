import commonjs from "@rollup/plugin-commonjs";
import { RollupBuild, rollup } from "rollup";
import { VariadicSingleton } from "tstl";

export namespace RollupBundler {
  export const build = async (script: string): Promise<string> => {
    const modules: Record<string, string> = {
      "index.js": script,
    };
    const builder: RollupBuild = await rollup({
      input: "index.js",
      plugins: [
        commonjs(),
        {
          name: "virtual",
          resolveId: (id) => {
            if (id in modules) return id;
            return new URL(id, "https://esm.sh").href;
          },
          load: (id) => {
            if (id in modules) return modules[id];
            return esm.get(id);
          },
        },
      ],
    });

    const { output } = await builder.generate({
      format: "iife",
      name: "module",
    });
    const bundled: string | undefined = output[0]?.code;
    if (!bundled?.length) throw new Error("Failed to bundle.");
    return bundled;
  };
}

const esm = new VariadicSingleton(async (url: string) => {
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
  console.log("reformUrl", path);
  return `https://esm.sh/${path}`;
};

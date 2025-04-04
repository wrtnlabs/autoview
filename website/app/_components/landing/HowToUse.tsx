import { HOW_TO_USE_CONTENTS } from "@/app/_constants/landing";
import { EllipsisIcon } from "lucide-react";
import { Highlight } from "prism-react-renderer";

export function HowToUse() {
  return (
    <div className="hidden md:flex flex-auto flex-col gap-8 rounded-3xl border bg-[#030303] border-zinc-700 p-2">
      <div className="flex h-10 items-center justify-between rounded-2xl border border-zinc-700 px-2.5 text-zinc-700">
        <div className="flex gap-2">
          <div className="h-5 w-5 rounded-full border border-zinc-700" />
          <div className="h-5 w-5 rounded-full border border-zinc-700" />
          <div className="h-5 w-5 rounded-full border border-zinc-700" />
        </div>
        <EllipsisIcon size={20} />
      </div>
      <div>
        <h3 className="text-3xl px-12 font-semibold text-[#F6F6F6]">How to use?</h3>
        <Highlight
          theme={{
            plain: { color: "#F7F7F7" },
            styles: [
              { types: ["bold"], style: { color: "#86FFD8" } },
            ],
          }}
          code={HOW_TO_USE_CONTENTS}
          language="markdown"
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={style}
              className="m-4 h-full overflow-x-auto bg-transparent! p-2 text-left [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-700/50"
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className="table-row overflow-scroll"
                >
                  <span className="table-cell pr-4 text-right opacity-50 select-none">
                    {i + 1}
                  </span>
                  <div className="table-cell">
                    {line.map((token, i) => {
                      if (token.types.includes('bold') && token.types.includes('punctuation')) return null
                      return <span key={i} {...getTokenProps({ token })} />
                    })}
                  </div>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
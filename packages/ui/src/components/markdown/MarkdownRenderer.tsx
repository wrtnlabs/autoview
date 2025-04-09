import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MarkdownComponents } from "./MarkdownComponents";


export const MarkdownRenderer = ({ children }: { children: string; }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{ ...MarkdownComponents }}
    >
      {children}
    </ReactMarkdown>
  )
}
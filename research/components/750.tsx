import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Blob
     *
     * @title Blob
    */
    export interface blob {
        content: string;
        encoding: string;
        url: string & tags.Format<"uri">;
        sha: string;
        size: (number & tags.Type<"int32">) | null;
        node_id: string;
        highlighted_content?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.blob;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sizeDisplay = value.size !== null ? `${value.size.toLocaleString()} bytes` : "Unknown size";
  const rawContent = value.highlighted_content ?? value.content;
  const preview =
    rawContent.length > 300 ? `${rawContent.slice(0, 300)}...` : rawContent;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      <div className="flex items-center mb-4">
        <LucideReact.FileText size={20} className="text-indigo-500" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">Blob Details</h2>
      </div>
      <div className="space-y-3 text-gray-700 text-sm">
        <div className="flex items-center">
          <LucideReact.Link size={16} className="text-gray-500" aria-label="URL" />
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 hover:underline truncate"
          >
            {value.url}
          </a>
        </div>
        <div className="flex items-center">
          <LucideReact.Code size={16} className="text-gray-500" aria-label="SHA" />
          <span className="ml-2 font-mono text-xs">{value.sha}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Database size={16} className="text-gray-500" aria-label="Size" />
          <span className="ml-2">{sizeDisplay}</span>
        </div>
        <div>
          <div className="mb-1 font-medium text-gray-600">Encoding</div>
          <span className="inline-block bg-gray-100 text-gray-800 text-xs font-mono px-2 py-0.5 rounded">
            {value.encoding}
          </span>
        </div>
        <div>
          <div className="mb-1 font-medium text-gray-600">Content Preview</div>
          <pre className="max-h-40 overflow-auto bg-gray-50 p-2 rounded text-xs font-mono whitespace-pre-wrap break-words">
            {preview}
          </pre>
        </div>
      </div>
    </div>
  );
}

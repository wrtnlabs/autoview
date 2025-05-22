import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Blob
     *
     * @title Blob
    */
    export type blob = {
        content: string;
        encoding: string;
        url: string & tags.Format<"uri">;
        sha: string;
        size: (number & tags.Type<"int32">) | null;
        node_id: string;
        highlighted_content?: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.blob;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sizeFormatted =
    value.size !== null
      ? value.size < 1024
        ? `${value.size} bytes`
        : `${(value.size / 1024).toFixed(2)} KB`
      : "Unknown size";

  const shaShort = value.sha.slice(0, 7);
  const previewContent = value.highlighted_content ?? value.content;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Blob Details</h2>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600 mb-4">
        <div className="flex">
          <dt className="font-medium w-24">URL:</dt>
          <dd className="truncate">{value.url}</dd>
        </div>
        <div className="flex">
          <dt className="font-medium w-24">Encoding:</dt>
          <dd>{value.encoding}</dd>
        </div>
        <div className="flex">
          <dt className="font-medium w-24">Size:</dt>
          <dd>{sizeFormatted}</dd>
        </div>
        <div className="flex">
          <dt className="font-medium w-24">SHA:</dt>
          <dd className="font-mono">{shaShort}</dd>
        </div>
      </dl>

      <div className="bg-gray-100 rounded-md overflow-hidden">
        {value.highlighted_content ? (
          <div
            className="prose prose-sm max-h-60 overflow-auto p-2"
            dangerouslySetInnerHTML={{ __html: previewContent }}
          />
        ) : (
          <pre className="p-2 font-mono text-sm text-gray-800 whitespace-pre-wrap line-clamp-6">
            {previewContent}
          </pre>
        )}
      </div>
    </div>
  );
}

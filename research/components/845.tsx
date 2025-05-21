import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Content File
     *
     * @title Content File
    */
    export type content_file = {
        type: "file";
        encoding: string;
        size: number & tags.Type<"int32">;
        name: string;
        path: string;
        content: string;
        sha: string;
        url: string & tags.Format<"uri">;
        git_url: (string & tags.Format<"uri">) | null;
        html_url: (string & tags.Format<"uri">) | null;
        download_url: (string & tags.Format<"uri">) | null;
        _links: {
            git: (string & tags.Format<"uri">) | null;
            html: (string & tags.Format<"uri">) | null;
            self: string & tags.Format<"uri">;
        };
        target?: string;
        submodule_git_url?: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.content_file;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(2)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  };
  const readableSize = formatSize(value.size);
  const shortSha = value.sha.slice(0, 7);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <p className="text-sm text-gray-500 truncate">{value.path}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">Size:</span> {readableSize}
        </div>
        <div>
          <span className="font-medium">Encoding:</span> {value.encoding}
        </div>
        <div>
          <span className="font-medium">Type:</span> {value.type}
        </div>
        <div>
          <span className="font-medium">SHA:</span>{" "}
          <code className="text-xs text-gray-600">{shortSha}</code>
        </div>
      </div>
      {value.html_url && (
        <div className="mt-4">
          <p className="text-xs text-gray-600 mb-1">View URL:</p>
          <p className="text-xs text-blue-600 break-all truncate">
            {value.html_url}
          </p>
        </div>
      )}
      {value.download_url && (
        <div className="mt-2">
          <p className="text-xs text-gray-600 mb-1">Download URL:</p>
          <p className="text-xs text-blue-600 break-all truncate">
            {value.download_url}
          </p>
        </div>
      )}
    </div>
  );
}

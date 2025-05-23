import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Code Of Conduct
     *
     * @title Code Of Conduct
    */
    export interface code_of_conduct {
        key: string;
        name: string;
        url: string & tags.Format<"uri">;
        body?: string;
        html_url: (string & tags.Format<"uri">) | null;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.code_of_conduct;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // No complex transformations needed for this schema.

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{value.name}</h2>
        {value.html_url && (
          <a
            href={value.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View HTML version"
            className="text-gray-400 hover:text-blue-500"
          >
            <LucideReact.ExternalLink size={16} />
          </a>
        )}
      </div>
      <div className="flex items-center mb-2 text-sm text-gray-600">
        <LucideReact.Link className="mr-1" size={16} />
        <a
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate hover:underline"
        >
          {value.url}
        </a>
      </div>
      {value.body && (
        <div className="mt-2 text-gray-700 text-sm line-clamp-3 whitespace-pre-wrap">
          {value.body}
        </div>
      )}
    </div>
  );
}

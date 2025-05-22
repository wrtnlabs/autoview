import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Git references within a repository
   *
   * @title Git Reference
   */
  export type git_ref = {
    ref: string;
    node_id: string;
    url: string & tags.Format<"uri">;
    object: {
      type: string;
      /**
       * SHA for the reference
       */
      sha: string;
      url: string & tags.Format<"uri">;
    };
  };
}
export type AutoViewInput = AutoViewInputSubTypes.git_ref;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { ref, url, object } = value;
  const { type, sha, url: objectUrl } = object;
  const truncatedSha = sha.slice(0, 7);

  // Utility to extract host or fallback to full URL
  const getHost = (link: string): string => {
    try {
      return new URL(link).host;
    } catch {
      return link;
    }
  };
  const refHost = getHost(url);
  const objectHost = getHost(objectUrl);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Reference name */}
      <div className="flex items-center space-x-2 mb-3">
        <LucideReact.GitBranch
          size={20}
          className="text-gray-500"
          aria-hidden="true"
        />
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={ref}
        >
          {ref}
        </h2>
      </div>

      {/* Type and SHA */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Tag
            size={16}
            className="text-gray-400"
            aria-hidden="true"
          />
          <span className="capitalize">{type}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Code2
            size={16}
            className="text-gray-400"
            aria-hidden="true"
          />
          <code className="font-mono">{truncatedSha}</code>
        </div>
      </div>

      {/* URLs */}
      <div className="mt-4 space-y-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:underline space-x-1 text-sm truncate"
          title={url}
        >
          <LucideReact.Link size={16} aria-hidden="true" />
          <span>{refHost}</span>
        </a>
        <a
          href={objectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:underline space-x-1 text-sm truncate"
          title={objectUrl}
        >
          <LucideReact.Link2 size={16} aria-hidden="true" />
          <span>{objectHost}</span>
        </a>
      </div>
    </div>
  );
}

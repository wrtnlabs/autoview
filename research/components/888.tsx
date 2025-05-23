import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Tag
     *
     * @title Tag
    */
    export interface tag {
        name: string;
        commit: {
            sha: string;
            url: string & tags.Format<"uri">;
        };
        zipball_url: string & tags.Format<"uri">;
        tarball_url: string & tags.Format<"uri">;
        node_id: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.tag[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const tags = value ?? [];
  const sortedTags = [...tags].sort((a, b) => a.name.localeCompare(b.name));
  const totalCount = tags.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} aria-label="No tags available" />
        <p className="mt-2 text-sm">No tags available.</p>
      </div>
    );
  }

  const items = sortedTags.map((tag) => {
    const shortSha = tag.commit.sha.slice(0, 7);
    return (
      <li
        key={tag.node_id}
        className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
      >
        <div className="flex items-center mb-2">
          <LucideReact.Tag size={16} className="text-blue-500" />
          <span className="ml-2 font-medium text-gray-900 truncate">{tag.name}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 space-x-1">
          <LucideReact.GitCommit size={16} />
          <a
            href={tag.commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate hover:text-blue-600"
          >
            {shortSha}
          </a>
        </div>
        <div className="mt-3 flex space-x-4 text-gray-500">
          <div className="flex items-center space-x-1">
            <LucideReact.Archive size={16} />
            <a
              href={tag.zipball_url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate hover:text-blue-600"
            >
              ZIP
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.Archive size={16} />
            <a
              href={tag.tarball_url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate hover:text-blue-600"
            >
              TAR
            </a>
          </div>
        </div>
      </li>
    );
  });

  // 3. Return the React element.
  return (
    <section aria-label="Tag List" className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Tag size={20} className="text-gray-600" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">Tags ({totalCount})</h2>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items}
      </ul>
    </section>
  );
}

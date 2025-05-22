import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Tag
   *
   * @title Tag
   */
  export type tag = {
    name: string;
    commit: {
      sha: string;
      url: string & tags.Format<"uri">;
    };
    zipball_url: string & tags.Format<"uri">;
    tarball_url: string & tags.Format<"uri">;
    node_id: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.tag[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Handle empty or missing data
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-400" />
        <p className="mt-4 text-lg">No tags available</p>
      </div>
    );
  }

  // 2. Render the list of tags with key information only
  return (
    <ul className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
      {value.map((tag) => {
        const shortSha = tag.commit.sha.slice(0, 7);
        return (
          <li key={tag.node_id} className="p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center text-lg font-semibold text-gray-900">
                <LucideReact.Tag size={20} className="text-blue-500 mr-2" />
                {tag.name}
              </h3>
              <span className="font-mono text-sm text-gray-600">
                {shortSha}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <LucideReact.Link size={16} className="text-gray-400" />
                <code className="block max-w-xs truncate text-xs text-gray-700">
                  {tag.commit.url}
                </code>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Archive size={16} className="text-gray-400" />
                <code className="block max-w-xs truncate text-xs text-gray-700">
                  {tag.zipball_url}
                </code>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Archive size={16} className="text-gray-400" />
                <code className="block max-w-xs truncate text-xs text-gray-700">
                  {tag.tarball_url}
                </code>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

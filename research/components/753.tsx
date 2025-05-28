import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Git references within a repository
     *
     * @title Git Reference
    */
    export interface git_ref {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.git_ref;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const branchName = value.ref.split('/').pop() || value.ref;
  const shaShort = value.object.sha.slice(0, 7);
  const objectType = value.object.type;
  const urlHost = (() => {
    try {
      return new URL(value.url).hostname;
    } catch {
      return value.url;
    }
  })();

  // select icon based on object type
  const ObjectIcon = (() => {
    switch (objectType.toLowerCase()) {
      case 'commit':
        return LucideReact.GitCommit;
      case 'tag':
        return LucideReact.Tag;
      default:
        return LucideReact.Code;
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center gap-2 flex-shrink-0">
        <LucideReact.GitBranch size={20} className="text-blue-500" />
        <span className="text-lg font-semibold text-gray-900 truncate">{branchName}</span>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-gray-600">
        <div className="flex items-center gap-1">
          <ObjectIcon size={16} className="text-gray-500" />
          <span className="capitalize">{objectType}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Terminal size={16} className="text-gray-500" />
          <span className="font-mono">{shaShort}</span>
        </div>
        <div className="flex items-center gap-1 truncate max-w-xs">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span title={value.url} className="truncate">{urlHost}</span>
        </div>
      </div>
    </div>
  );
}

import * as LucideReact from "lucide-react";
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
  //    Truncate SHA to 7 characters for readability.
  const shortSha = value.object.sha.slice(0, 7);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Display only the most relevant properties: ref name, object type, SHA, and URLs.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Reference Name */}
      <div className="flex items-center text-gray-800">
        <LucideReact.GitBranch className="mr-2 text-gray-500" size={20} />
        <h3 className="text-lg font-semibold truncate">{value.ref}</h3>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {/* Object Type */}
        <div className="flex items-center text-gray-600">
          <LucideReact.FileText className="mr-1" size={16} />
          <span className="capitalize">{value.object.type}</span>
        </div>

        {/* SHA */}
        <div className="flex items-center text-gray-600">
          <LucideReact.Hash className="mr-1" size={16} />
          <span title={value.object.sha} className="font-mono">
            {shortSha}
          </span>
        </div>

        {/* Remote Reference URL */}
        <div className="col-span-full flex items-center text-gray-600 overflow-hidden">
          <LucideReact.Link className="mr-1 flex-shrink-0" size={16} />
          <span className="truncate" title={value.url}>
            {value.url}
          </span>
        </div>

        {/* Object URL */}
        <div className="col-span-full flex items-center text-gray-600 overflow-hidden">
          <LucideReact.Link className="mr-1 flex-shrink-0" size={16} />
          <span className="truncate" title={value.object.url}>
            {value.object.url}
          </span>
        </div>
      </div>
    </div>
  );
}

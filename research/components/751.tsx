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
  // 1. Data aggregation/transformation
  const refSegments = value.ref.split('/');
  const refName = refSegments[refSegments.length - 1];
  const isBranch = value.ref.startsWith('refs/heads');
  const refIcon = isBranch
    ? <LucideReact.GitBranch size={20} className="text-blue-500" aria-label="Branch" />
    : <LucideReact.Tag size={20} className="text-indigo-500" aria-label="Tag" />;
  const shortSha = value.object.sha.slice(0, 7);
  const objectIcon = <LucideReact.GitCommit size={16} className="text-gray-400" aria-label="Commit" />;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        {refIcon}
        <span className="text-lg font-semibold text-gray-900 truncate">{refName}</span>
      </div>

      <div className="flex items-center space-x-1 text-sm text-gray-600">
        <LucideReact.Link size={16} className="text-gray-400" aria-label="Reference URL" />
        <span className="truncate" title={value.url}>{value.url}</span>
      </div>

      <div className="flex items-center space-x-2 text-sm text-gray-600">
        {objectIcon}
        <span className="capitalize">{value.object.type}</span>
        <span className="font-mono text-gray-800">{shortSha}</span>
      </div>

      <div className="flex items-center space-x-1 text-sm text-gray-600">
        <LucideReact.Link size={16} className="text-gray-400" aria-label="Object URL" />
        <span className="truncate" title={value.object.url}>{value.object.url}</span>
      </div>
    </div>
  );
}

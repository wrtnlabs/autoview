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
  const shortSha = value.object.sha.slice(0, 7);
  const refName = value.ref;
  const objectType = value.object.type;
  const referenceUrl = value.url;
  const objectUrl = value.object.url;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <LucideReact.GitBranch size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Git Reference</h2>
      </div>
      <dl className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <LucideReact.GitBranch size={16} className="text-gray-500" />
          <dt className="font-medium text-gray-700">Reference:</dt>
          <dd className="ml-1 text-gray-900 truncate">{refName}</dd>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.FileText size={16} className="text-gray-500" />
          <dt className="font-medium text-gray-700">Object Type:</dt>
          <dd className="ml-1 text-gray-900">{objectType}</dd>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Hash size={16} className="text-gray-500" />
          <dt className="font-medium text-gray-700">SHA:</dt>
          <dd className="ml-1 font-mono text-gray-800">{shortSha}</dd>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Link size={16} className="text-gray-500" />
          <dt className="font-medium text-gray-700">URL:</dt>
          <dd className="ml-1 text-blue-600 truncate break-all">
            {referenceUrl}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Link2 size={16} className="text-gray-500" />
          <dt className="font-medium text-gray-700">Object URL:</dt>
          <dd className="ml-1 text-blue-600 truncate break-all">{objectUrl}</dd>
        </div>
      </dl>
    </section>
  );
}

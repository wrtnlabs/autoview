import { tags } from "typia";
import React from "react";
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
  // Show a shorter SHA (first 7 characters) for readability.
  const shortSha = sha.slice(0, 7);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Git Reference</h2>
      <dl className="space-y-3 text-sm text-gray-700">
        <div>
          <dt className="font-medium">Reference Name:</dt>
          <dd className="text-gray-900 truncate">{ref}</dd>
        </div>
        <div>
          <dt className="font-medium">Object Type:</dt>
          <dd className="text-gray-900">{type}</dd>
        </div>
        <div>
          <dt className="font-medium">Commit SHA:</dt>
          <dd className="font-mono text-gray-900">{shortSha}</dd>
        </div>
        <div>
          <dt className="font-medium">URL:</dt>
          <dd className="text-blue-600 truncate break-all">{url}</dd>
        </div>
        <div>
          <dt className="font-medium">Object URL:</dt>
          <dd className="text-blue-600 truncate break-all">{objectUrl}</dd>
        </div>
      </dl>
    </div>
  );
}

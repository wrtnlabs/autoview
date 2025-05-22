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
  const shortSha: string = value.object.sha.slice(0, 7);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">
        Git Reference: {value.ref}
      </h2>
      <dl className="text-sm text-gray-700">
        <div className="flex justify-between mb-1">
          <dt className="font-medium">Object Type</dt>
          <dd className="ml-2 truncate">{value.object.type}</dd>
        </div>
        <div className="flex justify-between mb-1">
          <dt className="font-medium">Commit SHA</dt>
          <dd className="ml-2">
            <code className="font-mono text-gray-800">{shortSha}</code>
          </dd>
        </div>
        <div className="mt-3 space-y-1">
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 hover:underline truncate"
          >
            View Reference
          </a>
          <a
            href={value.object.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 hover:underline truncate"
          >
            View Associated Object
          </a>
        </div>
      </dl>
    </div>
  );
}

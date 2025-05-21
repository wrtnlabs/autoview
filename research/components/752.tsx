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
  const { ref, url: refUrl, object } = value;
  const { type: objectType, sha: fullSha, url: objectUrl } = object;
  const shortSha = fullSha.length > 7 ? fullSha.slice(0, 7) : fullSha;
  const truncate = (str: string, max = 50) =>
    str.length > max ? `${str.slice(0, max - 3)}...` : str;
  const displayRefUrl = truncate(refUrl);
  const displayObjectUrl = truncate(objectUrl);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{ref}</h2>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
          {objectType}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        <span className="font-medium">SHA:</span>{' '}
        <code className="bg-gray-100 text-xs px-1 py-0.5 rounded">{shortSha}</code>
      </p>
      <div className="mt-3 text-xs text-gray-500 space-y-1">
        <p>
          <span className="font-medium text-gray-700">Ref URL:</span>{' '}
          <span className="truncate block">{displayRefUrl}</span>
        </p>
        <p>
          <span className="font-medium text-gray-700">Object URL:</span>{' '}
          <span className="truncate block">{displayObjectUrl}</span>
        </p>
      </div>
    </div>
  );
}

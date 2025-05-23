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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants for display
  const shortSHA = value.object.sha.slice(0, 7);
  const parseUrl = (url: string): string => {
    try {
      const u = new URL(url);
      return `${u.host}${u.pathname}`;
    } catch {
      return url;
    }
  };
  const displayRefUrl = parseUrl(value.url);
  const displayObjectUrl = parseUrl(value.object.url);

  // 2. Visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Reference name */}
      <div className="flex items-center gap-2">
        <LucideReact.GitBranch
          aria-hidden="true"
          size={20}
          className="text-gray-500"
        />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.ref}
        </h2>
      </div>

      {/* Details */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center text-sm text-gray-700">
          <LucideReact.Hash
            aria-hidden="true"
            size={16}
            className="text-gray-500"
          />
          <span className="ml-1 font-mono truncate">{shortSHA}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <LucideReact.Tag
            aria-hidden="true"
            size={16}
            className="text-gray-500"
          />
          <span className="ml-1 capitalize">{value.object.type}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <LucideReact.Link
            aria-hidden="true"
            size={16}
            className="text-gray-500"
          />
          <span className="ml-1 truncate">{displayRefUrl}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <LucideReact.Link
            aria-hidden="true"
            size={16}
            className="text-gray-500"
          />
          <span className="ml-1 truncate">{displayObjectUrl}</span>
        </div>
      </div>
    </div>
  );
}

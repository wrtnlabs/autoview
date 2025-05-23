import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub organization.
     *
     * @title Organization Simple
    */
    export interface organization_simple {
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        hooks_url: string;
        issues_url: string;
        members_url: string;
        public_members_url: string;
        avatar_url: string;
        description: string | null;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.organization_simple[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const orgs = value as AutoViewInputSubTypes.organization_simple[];
  const total = orgs.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <p className="text-lg">No organizations found.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Summary */}
      <div className="flex items-center mb-4 text-gray-600">
        <LucideReact.Users size={16} className="mr-1" />
        <span>Total Organizations: {total}</span>
      </div>

      {/* Grid of organization cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orgs.map((org) => (
          <div
            key={org.id}
            className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden flex flex-col"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={org.avatar_url}
                alt={`${org.login} avatar`}
                className="w-full h-32 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(org.login)}&background=random&color=fff`;
                }}
              />
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {org.login}
              </h2>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {org.description ?? 'No description available.'}
              </p>

              {/* URLs */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <LucideReact.Link size={14} aria-hidden="true" />
                  <span className="truncate">{org.url}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <LucideReact.Github size={14} aria-hidden="true" />
                  <span className="truncate">{org.repos_url}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

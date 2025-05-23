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
  // 1. Handle empty state
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle className="mb-2 text-gray-400" size={48} />
        <span>No organizations available.</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {value.map((org) => {
        // Derived placeholder avatar in case of image loading error
        const placeholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          org.login
        )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={org.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={org.avatar_url}
              alt={`${org.login} avatar`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = placeholder;
              }}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="mt-3 w-full text-center">
              <div className="flex items-center justify-center gap-2">
                <LucideReact.Github className="text-gray-700" size={16} />
                <span className="text-lg font-semibold text-gray-900 truncate">
                  {org.login}
                </span>
              </div>
              {org.description && (
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                  {org.description}
                </p>
              )}
              <div className="mt-2 flex items-center justify-center text-sm text-gray-500">
                <LucideReact.Link size={16} />
                <span className="ml-1 truncate">{org.url}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

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
  //    In this case, we derive a fallback avatar URL generator.
  const getFallbackAvatar = (login: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=0D8ABC&color=fff&size=128`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No organizations found.</span>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {value.map((org) => (
        <div
          key={org.id}
          className="flex flex-col bg-white p-4 rounded-lg shadow transition-shadow hover:shadow-md"
        >
          <div className="flex items-center">
            <img
              src={org.avatar_url}
              alt={`${org.login} avatar`}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = getFallbackAvatar(org.login);
              }}
            />
            <div className="ml-3">
              <div className="text-lg font-semibold text-gray-800 truncate">
                {org.login}
              </div>
              <div className="flex items-center text-sm text-gray-500 truncate">
                <LucideReact.Link size={16} className="mr-1 flex-shrink-0" />
                <span className="truncate">{org.url}</span>
              </div>
            </div>
          </div>
          {org.description ? (
            <p className="mt-3 text-sm text-gray-700 line-clamp-2">
              {org.description}
            </p>
          ) : (
            <p className="mt-3 text-sm italic text-gray-400">
              No description available.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

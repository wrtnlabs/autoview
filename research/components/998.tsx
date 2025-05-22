import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A GitHub organization.
   *
   * @title Organization Simple
   */
  export type organization_simple = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.organization_simple[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Empty‐state handling
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-sm">No organizations available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {value.map((org) => {
        const { id, login, avatar_url, description, url, repos_url } = org;
        const displayDescription = description ?? "No description provided";

        return (
          <div
            key={id}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <img
                src={avatar_url}
                alt={`${login} avatar`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=1F2937&color=fff`;
                }}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
              <LucideReact.User size={20} className="text-gray-500" />
              <span>{login}</span>
            </h3>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {displayDescription}
            </p>
            <div className="mt-3 w-full flex flex-col gap-1">
              <div className="flex items-center justify-center gap-1 text-gray-500 text-xs">
                <LucideReact.Link size={14} />
                <span className="truncate">{url}</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-gray-500 text-xs">
                <LucideReact.GitBranch size={14} />
                <span className="truncate">{repos_url}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const orgCount = value.length;
  const sortedOrgs = [...value].sort((a, b) => a.login.localeCompare(b.login));
  const placeholderAvatar = (login: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (orgCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <p className="text-lg">No organizations found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Users size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Organizations ({orgCount})
        </h2>
      </div>
      <ul className="space-y-4">
        {sortedOrgs.map((org) => (
          <li
            key={org.id}
            className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src={org.avatar_url}
              alt={`${org.login} avatar`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = placeholderAvatar(
                  org.login,
                );
              }}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {org.login}
                </h3>
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600"
                  aria-label={`Visit ${org.login} homepage`}
                >
                  <LucideReact.Link size={16} />
                </a>
              </div>
              {org.description && (
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {org.description}
                </p>
              )}
              <div className="mt-2 flex items-center space-x-4 text-gray-500 text-sm">
                <a
                  href={org.repos_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-gray-700"
                  aria-label={`View ${org.login} repositories`}
                >
                  <LucideReact.GitBranch size={16} className="mr-1" />
                  <span>Repositories</span>
                </a>
                <a
                  href={org.events_url.replace("{/privacy}", "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-gray-700"
                  aria-label={`View ${org.login} events`}
                >
                  <LucideReact.Activity size={16} className="mr-1" />
                  <span>Events</span>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

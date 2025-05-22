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
  const organizations = value;
  const hasData = organizations && organizations.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <p className="text-lg">No organizations found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map((org) => {
        const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          org.login,
        )}&background=0D8ABC&color=fff&size=80`;
        return (
          <div
            key={org.id}
            className="flex flex-col bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={org.avatar_url}
                alt={`${org.login} avatar`}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = avatarPlaceholder;
                }}
              />
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {org.login}
              </h2>
            </div>
            {org.description !== null ? (
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                {org.description}
              </p>
            ) : (
              <p className="mt-2 italic text-gray-400 text-sm">
                No description provided.
              </p>
            )}
            <div className="mt-3 flex items-center text-blue-600 text-sm">
              <LucideReact.Link
                size={16}
                className="mr-1 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">{org.url}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

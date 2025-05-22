import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Collaborator
   *
   * @title Collaborator
   */
  export type collaborator = {
    login: string;
    id: number & tags.Type<"int32">;
    email?: string | null;
    name?: string | null;
    node_id: string;
    avatar_url: string & tags.Format<"uri">;
    gravatar_id: string | null;
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    followers_url: string & tags.Format<"uri">;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string & tags.Format<"uri">;
    organizations_url: string & tags.Format<"uri">;
    repos_url: string & tags.Format<"uri">;
    events_url: string;
    received_events_url: string & tags.Format<"uri">;
    type: string;
    site_admin: boolean;
    permissions?: {
      pull: boolean;
      triage?: boolean;
      push: boolean;
      maintain?: boolean;
      admin: boolean;
    };
    role_name: string;
    user_view_type?: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.collaborator[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derive the list of collaborators, handle empty state
  const collaborators = Array.isArray(value) ? value : [];

  if (collaborators.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-4 text-lg">No collaborators available</span>
      </div>
    );
  }

  // Compose the visual structure
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {collaborators.map((collab) => {
        // Derive display name and avatar fallback
        const displayName = collab.name?.trim() || collab.login;
        const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=0D8ABC&color=fff`;

        // Extract active permissions
        const permissions = collab.permissions
          ? (Object.entries(collab.permissions) as [string, boolean][])
              .filter(([_, flag]) => flag)
              .map(([key]) => key)
          : [];

        return (
          <div
            key={collab.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col"
          >
            {/* Header: avatar and name */}
            <div className="flex items-center space-x-4">
              <img
                src={collab.avatar_url}
                alt={displayName}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = avatarPlaceholder;
                }}
                className="w-12 h-12 rounded-full object-cover bg-gray-100"
              />
              <div className="flex-1">
                <div className="flex items-center text-lg font-semibold text-gray-900">
                  <LucideReact.User className="mr-1 text-gray-500" size={16} />
                  <span className="truncate">{displayName}</span>
                </div>
                <div className="mt-0.5 text-sm text-gray-500 truncate">
                  @{collab.login}
                </div>
              </div>
            </div>

            {/* Body: details */}
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              {collab.email && (
                <div className="flex items-center">
                  <LucideReact.Mail className="mr-1 text-gray-400" size={14} />
                  <span className="truncate">{collab.email}</span>
                </div>
              )}

              {collab.role_name && (
                <div className="flex items-center">
                  <LucideReact.Tag className="mr-1 text-blue-500" size={14} />
                  <span className="capitalize">{collab.role_name}</span>
                </div>
              )}

              <div className="flex items-center">
                <span className="mr-1 text-gray-600">Admin:</span>
                {collab.site_admin ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={14}
                  />
                ) : (
                  <LucideReact.XCircle className="text-red-500" size={14} />
                )}
              </div>

              {permissions.length > 0 && (
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-gray-600 mr-1">Permissions:</span>
                  {permissions.map((perm) => (
                    <span
                      key={perm}
                      className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs truncate"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

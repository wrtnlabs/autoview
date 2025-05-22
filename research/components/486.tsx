import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsOrganizationRoles {
    export type GetResponse = {
      /**
       * The total number of organization roles available to the organization.
       */
      total_count?: number & tags.Type<"int32">;
      /**
       * The list of organization roles available to the organization.
       */
      roles?: AutoViewInputSubTypes.organization_role[];
    };
  }
  /**
   * Organization roles
   *
   * @title Organization Role
   */
  export type organization_role = {
    /**
     * The unique identifier of the role.
     */
    id: number & tags.Type<"int32">;
    /**
     * The name of the role.
     */
    name: string;
    /**
     * A short description about who this role is for or what permissions it grants.
     */
    description?: string | null;
    /**
     * The system role from which this role inherits permissions.
     */
    base_role?: "read" | "triage" | "write" | "maintain" | "admin" | null;
    /**
     * Source answers the question, "where did this role come from?"
     */
    source?: "Organization" | "Enterprise" | "Predefined" | null;
    /**
     * A list of permissions included in this role.
     */
    permissions: string[];
    organization: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * The date and time the role was created.
     */
    created_at: string;
    /**
     * The date and time the role was last updated.
     */
    updated_at: string;
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type nullable_simple_user = {
    name?: string | null;
    email?: string | null;
    login: string;
    id: number & tags.Type<"int32">;
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
    starred_at?: string;
    user_view_type?: string;
  } | null;
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsOrganizationRoles.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const roles = value.roles ?? [];
  const totalCount = value.total_count ?? roles.length;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header: total count */}
      <div className="flex items-center mb-4">
        <LucideReact.Users className="text-gray-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-700">
          Total roles: {totalCount}
        </h2>
      </div>

      {/* Empty state */}
      {roles.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={40} />
          <p className="mt-2 text-sm">No roles available.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {roles.map((role) => {
            const login = role.organization?.login ?? "Unknown";
            const avatarUrl =
              role.organization?.avatar_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                login,
              )}&background=0D8ABC&color=fff`;

            return (
              <div
                key={role.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                {/* Title and badges */}
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-medium text-gray-800 truncate">
                    {role.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {role.base_role && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                        {role.base_role.charAt(0).toUpperCase() +
                          role.base_role.slice(1)}
                      </span>
                    )}
                    {role.source && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                        {role.source}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {role.description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {role.description}
                  </p>
                )}

                {/* Metadata: organization and dates */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-500 text-sm">
                  <div className="flex items-center">
                    <img
                      src={avatarUrl}
                      alt={login}
                      onError={(e) =>
                        ((e.currentTarget as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            login,
                          )}&background=0D8ABC&color=fff`)
                      }
                      className="w-6 h-6 rounded-full object-cover mr-1"
                    />
                    <span>{login}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Calendar size={16} className="mr-1" />
                    <span>Created: {formatDate(role.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Calendar size={16} className="mr-1" />
                    <span>Updated: {formatDate(role.updated_at)}</span>
                  </div>
                </div>

                {/* Permissions */}
                <div className="mt-3">
                  <span className="text-sm font-medium text-gray-700">
                    Permissions:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {role.permissions.map((perm) => (
                      <span
                        key={perm}
                        className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

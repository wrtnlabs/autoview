import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Minimal representation of an organization programmatic access grant for enumerations
   *
   * @title Organization Programmatic Access Grant
   */
  export type organization_programmatic_access_grant = {
    /**
     * Unique identifier of the fine-grained personal access token grant. The `pat_id` used to get details about an approved fine-grained personal access token.
     */
    id: number & tags.Type<"int32">;
    owner: AutoViewInputSubTypes.simple_user;
    /**
     * Type of repository selection requested.
     */
    repository_selection: "none" | "all" | "subset";
    /**
     * URL to the list of repositories the fine-grained personal access token can access. Only follow when `repository_selection` is `subset`.
     */
    repositories_url: string;
    /**
     * Permissions requested, categorized by type of permission.
     */
    permissions: {
      organization?: {
        [key: string]: string;
      };
      repository?: {
        [key: string]: string;
      };
      other?: {
        [key: string]: string;
      };
    };
    /**
     * Date and time when the fine-grained personal access token was approved to access the organization.
     */
    access_granted_at: string;
    /**
     * Unique identifier of the user's token. This field can also be found in audit log events and the organization's settings for their PAT grants.
     */
    token_id: number & tags.Type<"int32">;
    /**
     * The name given to the user's token. This field can also be found in an organization's settings page for Active Tokens.
     */
    token_name: string;
    /**
     * Whether the associated fine-grained personal access token has expired.
     */
    token_expired: boolean;
    /**
     * Date and time when the associated fine-grained personal access token expires.
     */
    token_expires_at: string | null;
    /**
     * Date and time when the associated fine-grained personal access token was last used for authentication.
     */
    token_last_used_at: string | null;
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.organization_programmatic_access_grant[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const grants = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {grants.map((grant) => {
        const ownerName = grant.owner.name ?? grant.owner.login;
        const orgCount = grant.permissions.organization
          ? Object.keys(grant.permissions.organization).length
          : 0;
        const repoCount = grant.permissions.repository
          ? Object.keys(grant.permissions.repository).length
          : 0;
        const otherCount = grant.permissions.other
          ? Object.keys(grant.permissions.other).length
          : 0;
        const formattedGranted = new Date(
          grant.access_granted_at,
        ).toLocaleString();
        const formattedExpires = grant.token_expires_at
          ? new Date(grant.token_expires_at).toLocaleDateString()
          : "Never";
        const formattedLastUsed = grant.token_last_used_at
          ? new Date(grant.token_last_used_at).toLocaleDateString()
          : "Never";

        return (
          <div
            key={grant.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
          >
            {/* Owner Info */}
            <div className="flex items-center space-x-4">
              <img
                src={grant.owner.avatar_url}
                alt={ownerName}
                className="w-12 h-12 rounded-full object-cover bg-gray-100"
                onError={(e) =>
                  ((e.currentTarget as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      ownerName,
                    )}&background=ccc&color=fff`)
                }
              />
              <div className="flex flex-col">
                <div className="flex items-center text-gray-900 font-medium space-x-1">
                  <LucideReact.User size={16} className="text-gray-500" />
                  <span>{ownerName}</span>
                </div>
                <div className="flex items-center text-gray-500 space-x-1">
                  <LucideReact.Mail size={16} className="text-gray-400" />
                  <span>{grant.owner.email ?? "—"}</span>
                </div>
              </div>
            </div>
            {/* Token & Status */}
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-1 text-gray-700">
                <LucideReact.Key size={16} className="text-gray-500" />
                <span>{grant.token_name}</span>
              </div>
              <div className="flex items-center space-x-1">
                {grant.token_expired ? (
                  <LucideReact.XCircle size={16} className="text-red-500" />
                ) : (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                  />
                )}
                <span className="text-gray-500">
                  {grant.token_expired ? "Expired" : "Active"}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>Granted: {formattedGranted}</span>
              </div>
            </div>
            {/* Repository Selection & URL */}
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-1">
                {grant.repository_selection === "none" && (
                  <LucideReact.XCircle size={16} className="text-gray-400" />
                )}
                {grant.repository_selection === "all" && (
                  <LucideReact.CheckSquare
                    size={16}
                    className="text-green-500"
                  />
                )}
                {grant.repository_selection === "subset" && (
                  <LucideReact.Link size={16} className="text-blue-500" />
                )}
                <span className="text-gray-500 capitalize">
                  {grant.repository_selection}
                </span>
              </div>
              {grant.repository_selection === "subset" && (
                <div
                  className="flex items-center space-x-1 text-blue-600 truncate"
                  title={grant.repositories_url}
                >
                  <LucideReact.Link size={16} />
                  <span className="truncate">{grant.repositories_url}</span>
                </div>
              )}
            </div>
            {/* Permissions Summary */}
            <div className="flex items-center space-x-1 text-gray-500">
              <LucideReact.ListChecks size={16} className="text-gray-500" />
              {orgCount + repoCount + otherCount > 0 ? (
                <span>
                  {orgCount > 0 && `${orgCount} org`}
                  {orgCount > 0 && repoCount + otherCount > 0 && " · "}
                  {repoCount > 0 && `${repoCount} repo`}
                  {repoCount > 0 && otherCount > 0 && " · "}
                  {otherCount > 0 && `${otherCount} other`}
                </span>
              ) : (
                <span>No permissions</span>
              )}
            </div>
            {/* Usage & Expiry */}
            <div className="flex flex-col space-y-2 text-gray-500 text-sm md:text-base md:flex-row md:items-center md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-1">
                <LucideReact.Clock size={16} className="text-gray-400" />
                <span>Last used: {formattedLastUsed}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>Expires: {formattedExpires}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

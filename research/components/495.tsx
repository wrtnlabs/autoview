import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Minimal representation of an organization programmatic access grant request for enumerations
   *
   * @title Simple Organization Programmatic Access Grant Request
   */
  export type organization_programmatic_access_grant_request = {
    /**
     * Unique identifier of the request for access via fine-grained personal access token. The `pat_request_id` used to review PAT requests.
     */
    id: number & tags.Type<"int32">;
    /**
     * Reason for requesting access.
     */
    reason: string | null;
    owner: AutoViewInputSubTypes.simple_user;
    /**
     * Type of repository selection requested.
     */
    repository_selection: "none" | "all" | "subset";
    /**
     * URL to the list of repositories requested to be accessed via fine-grained personal access token. Should only be followed when `repository_selection` is `subset`.
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
     * Date and time when the request for access was created.
     */
    created_at: string;
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
  AutoViewInputSubTypes.organization_programmatic_access_grant_request[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Format ISO date strings to a concise human-readable form
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Map repository selection values to friendly labels
  const getRepoSelectionLabel = (sel: "none" | "all" | "subset"): string => {
    switch (sel) {
      case "none":
        return "No repositories";
      case "all":
        return "All repositories";
      case "subset":
        return "Subset of repositories";
      default:
        return sel;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((request) => {
        const createdAt = formatDate(request.created_at);
        const expiresAt = request.token_expires_at
          ? formatDate(request.token_expires_at)
          : "Never";
        const lastUsed = request.token_last_used_at
          ? formatDate(request.token_last_used_at)
          : "Never";

        const isExpired = request.token_expired;
        const statusIcon = isExpired ? (
          <LucideReact.XCircle className="text-red-500" size={16} />
        ) : (
          <LucideReact.CheckCircle className="text-green-500" size={16} />
        );
        const statusLabel = isExpired ? "Expired" : "Active";

        const orgPermCount = Object.keys(
          request.permissions.organization ?? {},
        ).length;
        const repoPermCount = Object.keys(
          request.permissions.repository ?? {},
        ).length;
        const otherPermCount = Object.keys(
          request.permissions.other ?? {},
        ).length;

        return (
          <div
            key={request.id}
            className="p-4 bg-white rounded-lg shadow-sm space-y-3"
          >
            {/* Owner Info */}
            <div className="flex items-center gap-3">
              <img
                src={request.owner.avatar_url}
                alt={request.owner.login}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    request.owner.login,
                  )}&background=0D8ABC&color=fff`;
                }}
              />
              <span className="font-medium text-gray-800">
                {request.owner.login}
              </span>
            </div>

            {/* Token Name & Status */}
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-semibold">
                {request.token_name}
              </span>
              <div className="flex items-center gap-1 text-sm">
                {statusIcon}
                <span className="text-gray-700">{statusLabel}</span>
              </div>
            </div>

            {/* Timing Information */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>Created: {createdAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>Expires: {expiresAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Clock size={16} />
                <span>Last Used: {lastUsed}</span>
              </div>
            </div>

            {/* Repository Selection */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <LucideReact.Folder size={16} />
              <span>{getRepoSelectionLabel(request.repository_selection)}</span>
            </div>
            {request.repository_selection === "subset" && (
              <div className="flex items-center gap-1 text-sm text-blue-600 break-all">
                <LucideReact.Link2 size={16} />
                <span className="underline truncate">
                  {request.repositories_url}
                </span>
              </div>
            )}

            {/* Reason (if provided) */}
            {request.reason && (
              <div className="text-sm text-gray-700 line-clamp-2">
                <span className="font-medium">Reason:</span> {request.reason}
              </div>
            )}

            {/* Permissions Summary */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <LucideReact.Lock size={16} />
              <span>
                {orgPermCount} org · {repoPermCount} repo · {otherPermCount}{" "}
                other
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
  // 3. Return the React element.
}

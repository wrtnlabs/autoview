import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Minimal representation of an organization programmatic access grant request for enumerations
     *
     * @title Simple Organization Programmatic Access Grant Request
    */
    export interface organization_programmatic_access_grant_request {
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
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.organization_programmatic_access_grant_request[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso?: string | null): string => {
    if (!iso) return "—";
    const date = new Date(iso);
    return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {value.map((item) => {
        const {
          id,
          owner,
          token_name,
          created_at,
          token_expires_at,
          token_expired,
          token_last_used_at,
          repository_selection,
          repositories_url,
          permissions,
          reason,
        } = item;

        const orgCount = permissions.organization ? Object.keys(permissions.organization).length : 0;
        const repoCount = permissions.repository ? Object.keys(permissions.repository).length : 0;
        const otherCount = permissions.other ? Object.keys(permissions.other).length : 0;
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          owner.name ?? owner.login
        )}&background=0D8ABC&color=fff`;

        return (
          <div key={id} className="bg-white p-4 rounded-lg shadow">
            {/* Header: Avatar, Token Name, Owner Login, Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={owner.avatar_url}
                  alt={owner.login}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = avatarFallback;
                  }}
                />
                <div>
                  <div className="text-lg font-semibold text-gray-900">{token_name}</div>
                  <div className="text-sm text-gray-600">{owner.login}</div>
                </div>
              </div>
              <div>
                {token_expired ? (
                  <LucideReact.AlertTriangle
                    aria-label="Expired"
                    className="text-red-500"
                    size={20}
                  />
                ) : (
                  <LucideReact.CheckCircle
                    aria-label="Active"
                    className="text-green-500"
                    size={20}
                  />
                )}
              </div>
            </div>

            {/* Meta Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>Created: {formatDate(created_at)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>Expires: {formatDate(token_expires_at)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LucideReact.Users size={16} className="text-gray-400" />
                <span>Org Perms: {orgCount}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LucideReact.Folder size={16} className="text-gray-400" />
                <span>Repo Perms: {repoCount}</span>
              </div>
              {otherCount > 0 && (
                <div className="flex items-center space-x-2">
                  <LucideReact.Tag size={16} className="text-gray-400" />
                  <span>Other Perms: {otherCount}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <LucideReact.ListOrdered size={16} className="text-gray-400" />
                <span>Selection: {repository_selection}</span>
              </div>
              {repository_selection === "subset" && (
                <div className="col-span-full flex items-start space-x-2 text-blue-600 break-all">
                  <LucideReact.Link size={16} className="text-gray-400" />
                  <span>{repositories_url}</span>
                </div>
              )}
            </div>

            {/* Reason */}
            {reason && (
              <div className="mt-4">
                <div className="text-sm text-gray-500 mb-1">Reason</div>
                <p className="text-gray-700 text-sm line-clamp-2">{reason}</p>
              </div>
            )}

            {/* Last Used */}
            {token_last_used_at && (
              <div className="mt-4 flex items-center space-x-2 text-sm text-gray-700">
                <LucideReact.Clock size={16} className="text-gray-400" />
                <span>Last used: {formatDate(token_last_used_at)}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.organization_programmatic_access_grant_request[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // If there are no requests, show a placeholder message
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No access grant requests available.
      </div>
    );
  }

  // Helper to format ISO date strings into a human‐readable form
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // Simple truncation for long text
  const truncate = (text: string, max = 100): string =>
    text.length > max ? text.slice(0, max) + '…' : text;

  // Render a responsive grid of cards
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {value.map((request) => {
        const {
          id,
          owner,
          reason,
          repository_selection,
          repositories_url,
          permissions,
          created_at,
          token_name,
          token_expired,
          token_expires_at,
          token_last_used_at,
        } = request;

        // Derived values
        const createdAt = formatDate(created_at);
        const expiresAt = token_expires_at ? formatDate(token_expires_at) : 'Never';
        const lastUsedAt = token_last_used_at
          ? formatDate(token_last_used_at)
          : 'Never used';
        const statusLabel = token_expired ? 'Expired' : 'Active';
        const statusClasses = token_expired
          ? 'bg-red-100 text-red-800'
          : 'bg-green-100 text-green-800';

        // Permission counts
        const orgCount = permissions.organization
          ? Object.keys(permissions.organization).length
          : 0;
        const repoCount = permissions.repository
          ? Object.keys(permissions.repository).length
          : 0;
        const otherCount = permissions.other
          ? Object.keys(permissions.other).length
          : 0;

        return (
          <div key={id} className="p-4 bg-white rounded-lg shadow">
            {/* Header: Owner avatar, name, creation date, status */}
            <div className="flex items-center space-x-4">
              <img
                src={owner.avatar_url}
                alt={`${owner.login} avatar`}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {owner.login}
                </p>
                <p className="text-xs text-gray-500">
                  Requested on{' '}
                  <time dateTime={created_at}>{createdAt}</time>
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${statusClasses}`}
              >
                {statusLabel}
              </span>
            </div>

            {/* Reason (if provided) */}
            {reason && (
              <p className="mt-3 text-sm text-gray-700 italic line-clamp-2">
                {truncate(reason, 120)}
              </p>
            )}

            {/* Details */}
            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Grant:</span>{' '}
                {repository_selection.charAt(0).toUpperCase() +
                  repository_selection.slice(1)}
              </p>
              {repository_selection === 'subset' && (
                <p>
                  <span className="font-medium">Repos URL:</span>{' '}
                  <span className="break-all">
                    {truncate(repositories_url, 30)}
                  </span>
                </p>
              )}
              <p>
                <span className="font-medium">Permissions:</span> Org({orgCount})
                &nbsp;Repo({repoCount})&nbsp;Other({otherCount})
              </p>
              <p>
                <span className="font-medium">Expires:</span> {expiresAt}
              </p>
              <p>
                <span className="font-medium">Last Used:</span> {lastUsedAt}
              </p>
            </div>

            {/* Token name */}
            <p className="mt-3 text-sm font-medium text-gray-800 truncate">
              {token_name}
            </p>
          </div>
        );
      })}
    </div>
  );
}

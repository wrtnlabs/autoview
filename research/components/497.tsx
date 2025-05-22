import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.organization_programmatic_access_grant[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      : 'N/A';

  const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((grant) => {
        const ownerName = grant.owner.name ?? grant.owner.login;
        const status = grant.token_expired ? 'Expired' : 'Active';
        const statusColor = grant.token_expired ? 'bg-red-500' : 'bg-green-500';
        const permOrgCount = grant.permissions.organization
          ? Object.keys(grant.permissions.organization).length
          : 0;
        const permRepoCount = grant.permissions.repository
          ? Object.keys(grant.permissions.repository).length
          : 0;
        const permOtherCount = grant.permissions.other
          ? Object.keys(grant.permissions.other).length
          : 0;

        return (
          <div key={grant.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {grant.token_name}
                </h3>
                <p className="text-sm text-gray-500">Owner: {ownerName}</p>
              </div>
              <span
                className={`text-xs font-medium text-white px-2 py-0.5 rounded-full ${statusColor}`}
              >
                {status}
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div>
                <dt className="font-medium text-gray-500">Access Granted</dt>
                <dd className="text-gray-900">
                  {formatDate(grant.access_granted_at)}
                </dd>
              </div>

              <div>
                <dt className="font-medium text-gray-500">Expires</dt>
                <dd className="text-gray-900">
                  {grant.token_expires_at
                    ? formatDate(grant.token_expires_at)
                    : 'No Expiry'}
                </dd>
              </div>

              <div>
                <dt className="font-medium text-gray-500">Last Used</dt>
                <dd className="text-gray-900">
                  {grant.token_last_used_at
                    ? formatDate(grant.token_last_used_at)
                    : 'Never Used'}
                </dd>
              </div>

              <div>
                <dt className="font-medium text-gray-500">
                  Repository Selection
                </dt>
                <dd className="text-gray-900">
                  {capitalize(grant.repository_selection)}
                </dd>
              </div>

              {grant.repository_selection === 'subset' && (
                <div className="sm:col-span-2">
                  <dt className="font-medium text-gray-500">
                    Repositories URL
                  </dt>
                  <dd className="text-gray-900 truncate">
                    {grant.repositories_url}
                  </dd>
                </div>
              )}

              <div
                className={
                  grant.repository_selection === 'subset' ? 'sm:col-span-2' : ''
                }
              >
                <dt className="font-medium text-gray-500">Permissions</dt>
                <dd className="text-gray-900">
                  Org: {permOrgCount}, Repo: {permRepoCount}, Other:{' '}
                  {permOtherCount}
                </dd>
              </div>
            </dl>
          </div>
        );
      })}
    </div>
  );
}

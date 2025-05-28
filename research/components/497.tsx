import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Minimal representation of an organization programmatic access grant for enumerations
     *
     * @title Organization Programmatic Access Grant
    */
    export interface organization_programmatic_access_grant {
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
export type AutoViewInput = AutoViewInputSubTypes.organization_programmatic_access_grant[];



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No access grants found</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((grant) => {
        const ownerName = grant.owner.name ?? grant.owner.login;
        const grantedDate = new Date(grant.access_granted_at).toLocaleString();
        const expiresDate = grant.token_expires_at
          ? new Date(grant.token_expires_at).toLocaleDateString()
          : "Never expires";
        const lastUsed = grant.token_last_used_at
          ? new Date(grant.token_last_used_at).toLocaleDateString()
          : "Never used";
        const orgPerms = grant.permissions.organization
          ? Object.keys(grant.permissions.organization).length
          : 0;
        const repoPerms = grant.permissions.repository
          ? Object.keys(grant.permissions.repository).length
          : 0;
        const otherPerms = grant.permissions.other
          ? Object.keys(grant.permissions.other).length
          : 0;
        const totalPerms = orgPerms + repoPerms + otherPerms;

        let selectionIcon;
        let selectionLabel;
        if (grant.repository_selection === "none") {
          selectionIcon = <LucideReact.XCircle size={16} className="text-gray-500" />;
          selectionLabel = "No repos";
        } else if (grant.repository_selection === "all") {
          selectionIcon = <LucideReact.CheckCircle size={16} className="text-gray-500" />;
          selectionLabel = "All repos";
        } else {
          selectionIcon = <LucideReact.List size={16} className="text-gray-500" />;
          selectionLabel = "Subset of repos";
        }

        return (
          <div key={grant.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={grant.owner.avatar_url}
                  alt={ownerName}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      ownerName
                    )}&background=0D8ABC&color=fff`;
                  }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{grant.token_name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <LucideReact.User size={16} />
                    <span>{ownerName}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {grant.token_expired ? (
                  <>
                    <LucideReact.XCircle size={16} className="text-red-500" />
                    <span className="text-red-500 text-sm">Expired</span>
                  </>
                ) : (
                  <>
                    <LucideReact.CheckCircle size={16} className="text-green-500" />
                    <span className="text-green-500 text-sm">Active</span>
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>Granted: {grantedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>Expires: {expiresDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Clock size={16} className="text-gray-400" />
                <span>Last used: {lastUsed}</span>
              </div>
              <div className="flex items-center gap-1">
                {selectionIcon}
                <span>{selectionLabel}</span>
              </div>
            </div>
            {totalPerms > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {orgPerms > 0 && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                    <LucideReact.Users size={12} /> Org: {orgPerms}
                  </span>
                )}
                {repoPerms > 0 && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">
                    <LucideReact.GitBranch size={12} /> Repo: {repoPerms}
                  </span>
                )}
                {otherPerms > 0 && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-xs">
                    <LucideReact.Tag size={12} /> Other: {otherPerms}
                  </span>
                )}
              </div>
            )}
            {grant.repository_selection === "subset" && (
              <div className="mt-4 flex items-center gap-1 text-sm text-gray-500">
                <LucideReact.Link size={16} />
                <span className="truncate break-all">{grant.repositories_url}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

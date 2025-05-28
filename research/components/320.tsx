import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The authorization for an OAuth app, GitHub App, or a Personal Access Token.
     *
     * @title Authorization
    */
    export interface authorization {
        id: number & tags.Type<"int32">;
        url: string & tags.Format<"uri">;
        /**
         * A list of scopes that this authorization is in.
        */
        scopes: string[] | null;
        token: string;
        token_last_eight: string | null;
        hashed_token: string | null;
        app: {
            client_id: string;
            name: string;
            url: string & tags.Format<"uri">;
        };
        note: string | null;
        note_url: (string & tags.Format<"uri">) | null;
        updated_at: string & tags.Format<"date-time">;
        created_at: string & tags.Format<"date-time">;
        fingerprint: string | null;
        user?: AutoViewInputSubTypes.nullable_simple_user;
        installation?: AutoViewInputSubTypes.nullable_scoped_installation;
        expires_at: (string & tags.Format<"date-time">) | null;
    }
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
    /**
     * @title Scoped Installation
    */
    export type nullable_scoped_installation = {
        permissions: AutoViewInputSubTypes.app_permissions;
        /**
         * Describe whether all repositories have been selected or there's a selection involved
        */
        repository_selection: "all" | "selected";
        single_file_name: string | null;
        has_multiple_single_files?: boolean;
        single_file_paths?: string[];
        repositories_url: string & tags.Format<"uri">;
        account: AutoViewInputSubTypes.simple_user;
    } | null;
    /**
     * The permissions granted to the user access token.
     *
     * @title App Permissions
    */
    export interface app_permissions {
        /**
         * The level of permission to grant the access token for GitHub Actions workflows, workflow runs, and artifacts.
        */
        actions?: "read" | "write";
        /**
         * The level of permission to grant the access token for repository creation, deletion, settings, teams, and collaborators creation.
        */
        administration?: "read" | "write";
        /**
         * The level of permission to grant the access token for checks on code.
        */
        checks?: "read" | "write";
        /**
         * The level of permission to grant the access token to create, edit, delete, and list Codespaces.
        */
        codespaces?: "read" | "write";
        /**
         * The level of permission to grant the access token for repository contents, commits, branches, downloads, releases, and merges.
        */
        contents?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage Dependabot secrets.
        */
        dependabot_secrets?: "read" | "write";
        /**
         * The level of permission to grant the access token for deployments and deployment statuses.
        */
        deployments?: "read" | "write";
        /**
         * The level of permission to grant the access token for managing repository environments.
        */
        environments?: "read" | "write";
        /**
         * The level of permission to grant the access token for issues and related comments, assignees, labels, and milestones.
        */
        issues?: "read" | "write";
        /**
         * The level of permission to grant the access token to search repositories, list collaborators, and access repository metadata.
        */
        metadata?: "read" | "write";
        /**
         * The level of permission to grant the access token for packages published to GitHub Packages.
        */
        packages?: "read" | "write";
        /**
         * The level of permission to grant the access token to retrieve Pages statuses, configuration, and builds, as well as create new builds.
        */
        pages?: "read" | "write";
        /**
         * The level of permission to grant the access token for pull requests and related comments, assignees, labels, milestones, and merges.
        */
        pull_requests?: "read" | "write";
        /**
         * The level of permission to grant the access token to view and edit custom properties for a repository, when allowed by the property.
        */
        repository_custom_properties?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage the post-receive hooks for a repository.
        */
        repository_hooks?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage repository projects, columns, and cards.
        */
        repository_projects?: "read" | "write" | "admin";
        /**
         * The level of permission to grant the access token to view and manage secret scanning alerts.
        */
        secret_scanning_alerts?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage repository secrets.
        */
        secrets?: "read" | "write";
        /**
         * The level of permission to grant the access token to view and manage security events like code scanning alerts.
        */
        security_events?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage just a single file.
        */
        single_file?: "read" | "write";
        /**
         * The level of permission to grant the access token for commit statuses.
        */
        statuses?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage Dependabot alerts.
        */
        vulnerability_alerts?: "read" | "write";
        /**
         * The level of permission to grant the access token to update GitHub Actions workflow files.
        */
        workflows?: "write";
        /**
         * The level of permission to grant the access token for organization teams and members.
        */
        members?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage access to an organization.
        */
        organization_administration?: "read" | "write";
        /**
         * The level of permission to grant the access token for custom repository roles management.
        */
        organization_custom_roles?: "read" | "write";
        /**
         * The level of permission to grant the access token for custom organization roles management.
        */
        organization_custom_org_roles?: "read" | "write";
        /**
         * The level of permission to grant the access token for custom property management.
        */
        organization_custom_properties?: "read" | "write" | "admin";
        /**
         * The level of permission to grant the access token for managing access to GitHub Copilot for members of an organization with a Copilot Business subscription. This property is in public preview and is subject to change.
        */
        organization_copilot_seat_management?: "write";
        /**
         * The level of permission to grant the access token to view and manage announcement banners for an organization.
        */
        organization_announcement_banners?: "read" | "write";
        /**
         * The level of permission to grant the access token to view events triggered by an activity in an organization.
        */
        organization_events?: "read";
        /**
         * The level of permission to grant the access token to manage the post-receive hooks for an organization.
        */
        organization_hooks?: "read" | "write";
        /**
         * The level of permission to grant the access token for viewing and managing fine-grained personal access token requests to an organization.
        */
        organization_personal_access_tokens?: "read" | "write";
        /**
         * The level of permission to grant the access token for viewing and managing fine-grained personal access tokens that have been approved by an organization.
        */
        organization_personal_access_token_requests?: "read" | "write";
        /**
         * The level of permission to grant the access token for viewing an organization's plan.
        */
        organization_plan?: "read";
        /**
         * The level of permission to grant the access token to manage organization projects and projects public preview (where available).
        */
        organization_projects?: "read" | "write" | "admin";
        /**
         * The level of permission to grant the access token for organization packages published to GitHub Packages.
        */
        organization_packages?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage organization secrets.
        */
        organization_secrets?: "read" | "write";
        /**
         * The level of permission to grant the access token to view and manage GitHub Actions self-hosted runners available to an organization.
        */
        organization_self_hosted_runners?: "read" | "write";
        /**
         * The level of permission to grant the access token to view and manage users blocked by the organization.
        */
        organization_user_blocking?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage team discussions and related comments.
        */
        team_discussions?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage the email addresses belonging to a user.
        */
        email_addresses?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage the followers belonging to a user.
        */
        followers?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage git SSH keys.
        */
        git_ssh_keys?: "read" | "write";
        /**
         * The level of permission to grant the access token to view and manage GPG keys belonging to a user.
        */
        gpg_keys?: "read" | "write";
        /**
         * The level of permission to grant the access token to view and manage interaction limits on a repository.
        */
        interaction_limits?: "read" | "write";
        /**
         * The level of permission to grant the access token to manage the profile settings belonging to a user.
        */
        profile?: "write";
        /**
         * The level of permission to grant the access token to list and manage repositories a user is starring.
        */
        starring?: "read" | "write";
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
export type AutoViewInput = AutoViewInputSubTypes.authorization;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const created = new Date(value.created_at).toLocaleString();
  const updated = new Date(value.updated_at).toLocaleString();
  const expiresDate = value.expires_at ? new Date(value.expires_at) : null;
  const formattedExpires = expiresDate ? expiresDate.toLocaleString() : "Never";
  const isExpired = expiresDate ? expiresDate < new Date() : false;
  const tokenDisplay = `••••••${value.token_last_eight ?? value.hashed_token?.slice(-8) ?? ""}`;
  const scopes = value.scopes ?? [];
  const permissionEntries = value.installation?.permissions
    ? (Object.entries(value.installation.permissions) as [string, string][]).filter(
        ([, lvl]) => lvl,
      )
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-4 max-w-md mx-auto">
      {/* App Info */}
      <div className="flex items-center space-x-2">
        <LucideReact.Box size={20} className="text-gray-600" />
        <a
          href={value.app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-blue-600 hover:underline truncate"
        >
          {value.app.name}
        </a>
      </div>

      {/* Token */}
      <div className="flex items-center space-x-2">
        <LucideReact.Key size={20} className="text-gray-600" />
        <span className="font-mono text-gray-800">{tokenDisplay}</span>
      </div>

      {/* Dates */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {created}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Updated: {updated}</span>
        </div>
      </div>

      {/* Expiration */}
      <div className="flex items-center space-x-1 text-sm">
        <span>Expires:</span>
        <span className={isExpired ? "text-red-500 font-medium" : "text-gray-600"}>
          {formattedExpires}
        </span>
        {isExpired && <LucideReact.AlertTriangle size={16} className="text-red-500" />}
      </div>

      {/* Note */}
      {value.note && (
        <div className="flex items-center space-x-2">
          <LucideReact.Edit3 size={16} className="text-gray-600" />
          <span className="text-gray-700 text-sm truncate">{value.note}</span>
          {value.note_url && (
            <a
              href={value.note_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              <LucideReact.Link size={16} />
            </a>
          )}
        </div>
      )}

      {/* Scopes */}
      <div>
        <div className="text-sm font-semibold text-gray-700 mb-1">Scopes</div>
        <div className="flex flex-wrap gap-2">
          {scopes.length > 0 ? (
            scopes.map((scope) => (
              <span
                key={scope}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center"
              >
                <LucideReact.Tag size={12} className="inline-block mr-1" />
                {scope}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">None</span>
          )}
        </div>
      </div>

      {/* User */}
      {value.user && (
        <div className="flex items-center space-x-3">
          <img
            src={value.user.avatar_url}
            alt={value.user.login}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                value.user!.login,
              )}&background=ccc&color=fff`;
            }}
          />
          <div className="text-sm truncate">
            <div className="font-medium text-gray-800">{value.user.login}</div>
            {value.user.name && <div className="text-gray-500">{value.user.name}</div>}
          </div>
        </div>
      )}

      {/* Installation */}
      {value.installation && (
        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center space-x-2">
            <LucideReact.Package size={18} className="text-gray-600" />
            <span className="font-semibold text-gray-700">Installation</span>
          </div>
          <div className="text-sm space-y-1">
            <div>
              <span className="font-medium">Selection:</span>{" "}
              {value.installation.repository_selection === "all"
                ? "All repositories"
                : "Selected repositories"}
            </div>
            {value.installation.single_file_name && (
              <div>
                <span className="font-medium">File:</span> {value.installation.single_file_name}
              </div>
            )}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">Permissions</div>
            <div className="grid grid-cols-2 gap-2">
              {permissionEntries.map(([perm, lvl]) => (
                <span key={perm} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                  {`${perm}: ${lvl}`}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <img
              src={value.installation.account.avatar_url}
              alt={value.installation.account.login}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  value.installation!.account.login,
                )}&background=ccc&color=fff`;
              }}
            />
            <span className="text-sm text-gray-800 font-medium">
              {value.installation.account.login}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

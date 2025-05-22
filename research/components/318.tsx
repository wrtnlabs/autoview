import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * The authorization for an OAuth app, GitHub App, or a Personal Access Token.
   *
   * @title Authorization
   */
  export type authorization = {
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
  export type app_permissions = {
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
export type AutoViewInput = AutoViewInputSubTypes.authorization;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt: string = new Date(value.created_at).toLocaleString();
  const updatedAt: string = new Date(value.updated_at).toLocaleString();
  const expiresAt: string = value.expires_at
    ? new Date(value.expires_at).toLocaleString()
    : "Never expires";
  const maskedToken: string = value.token_last_eight
    ? `••••••••${value.token_last_eight}`
    : "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: App Name */}
      <div className="flex items-center space-x-2">
        <LucideReact.Key size={20} className="text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          {value.app.name}
        </h2>
      </div>

      {/* App URL */}
      <div className="flex items-center space-x-1 text-sm text-gray-600">
        <LucideReact.Link size={16} />
        <a
          href={value.app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-600 truncate"
        >
          {value.app.url}
        </a>
      </div>

      {/* Token */}
      <div>
        <span className="text-sm font-medium text-gray-600">Token:</span>
        <div className="mt-1 font-mono text-gray-700 truncate">
          {maskedToken}
        </div>
      </div>

      {/* Scopes */}
      <div>
        <span className="text-sm font-medium text-gray-600">Scopes:</span>
        {value.scopes && value.scopes.length > 0 ? (
          <div className="mt-1 flex flex-wrap gap-1">
            {value.scopes.map((scope) => (
              <span
                key={scope}
                className="flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
              >
                <LucideReact.Tag size={12} className="mr-1" />
                {scope}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-1 text-sm text-gray-500">No scopes granted</div>
        )}
      </div>

      {/* Timestamps */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar size={14} className="mr-1" />
          Created: {createdAt}
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={14} className="mr-1" />
          Updated: {updatedAt}
        </div>
        <div className="flex items-center col-span-2">
          <LucideReact.Clock size={14} className="mr-1" />
          Expires: {expiresAt}
        </div>
      </div>

      {/* Note */}
      {value.note && (
        <div>
          <span className="text-sm font-medium text-gray-600">Note:</span>
          {value.note_url ? (
            <a
              href={value.note_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 text-sm text-blue-600 hover:underline truncate"
            >
              {value.note}
            </a>
          ) : (
            <div className="mt-1 text-sm text-gray-700 truncate">
              {value.note}
            </div>
          )}
        </div>
      )}

      {/* Fingerprint */}
      {value.fingerprint && (
        <div>
          <span className="text-sm font-medium text-gray-600">
            Fingerprint:
          </span>
          <div className="mt-1 font-mono text-gray-700 truncate">
            {value.fingerprint}
          </div>
        </div>
      )}

      {/* Linked User */}
      {value.user && (
        <div className="flex items-center mt-4 space-x-3">
          <img
            src={value.user.avatar_url}
            alt={value.user.login}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                value.user?.login || "User",
              )}&background=ddd&color=555`;
            }}
          />
          <div className="truncate">
            <div className="text-sm font-medium text-gray-800">
              {value.user.name || value.user.login}
            </div>
            <div className="text-xs text-gray-500 truncate">
              @{value.user.login}
            </div>
          </div>
        </div>
      )}

      {/* Scoped Installation */}
      {value.installation && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
          <div className="flex items-center space-x-2">
            <img
              src={value.installation.account.avatar_url}
              alt={value.installation.account.login}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  value.installation!.account.login,
                )}&background=ddd&color=555`;
              }}
            />
            <div className="text-sm font-medium text-gray-800 truncate">
              {value.installation.account.name ||
                value.installation.account.login}
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Repositories:</span>{" "}
            {value.installation.repository_selection === "all"
              ? "All"
              : "Selected"}
          </div>
        </div>
      )}
    </article>
  );
}

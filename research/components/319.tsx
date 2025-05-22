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
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const expiresAt = value.expires_at
    ? new Date(value.expires_at).toLocaleString()
    : null;
  const maskedToken = value.token_last_eight
    ? `••••••${value.token_last_eight}`
    : null;
  const hasScopes = Array.isArray(value.scopes) && value.scopes.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* App Header */}
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
          <LucideReact.Key
            size={20}
            className="text-gray-500"
            aria-hidden="true"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">
            {value.app.name}
          </h2>
          <a
            href={value.app.url}
            className="inline-flex items-center text-sm text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LucideReact.Link size={14} className="mr-1" aria-hidden="true" />
            Visit App
          </a>
        </div>
      </div>

      {/* Optional Note */}
      {value.note && (
        <div className="flex items-center text-gray-700">
          <LucideReact.Edit3
            size={16}
            className="mr-2 text-gray-500"
            aria-hidden="true"
          />
          <span className="text-sm">{value.note}</span>
        </div>
      )}

      {/* Token Preview */}
      {maskedToken && (
        <div className="flex items-center text-gray-700">
          <LucideReact.Key
            size={16}
            className="mr-2 text-gray-500"
            aria-hidden="true"
          />
          <span className="text-sm">Token ending: {maskedToken}</span>
        </div>
      )}

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-2" aria-hidden="true" />
          Created: {createdAt}
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-2" aria-hidden="true" />
          Updated: {updatedAt}
        </div>
        {expiresAt && (
          <div className="flex items-center sm:col-span-2">
            <LucideReact.Clock
              size={16}
              className="mr-2 text-amber-500"
              aria-hidden="true"
            />
            Expires: {expiresAt}
          </div>
        )}
      </div>

      {/* Scopes */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Scopes</h3>
        {hasScopes ? (
          <div className="flex flex-wrap gap-2">
            {value.scopes!.map((scope) => (
              <span
                key={scope}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
              >
                {scope}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">No scopes assigned</div>
        )}
      </div>

      {/* User */}
      {value.user && (
        <div className="flex items-center space-x-3">
          <img
            src={value.user.avatar_url}
            alt={value.user.login}
            className="h-8 w-8 rounded-full object-cover bg-gray-100"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  value.user!.login,
                )}&background=0D8ABC&color=fff`;
            }}
          />
          <a
            href={value.user.html_url}
            className="text-sm font-medium text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value.user.login}
          </a>
        </div>
      )}

      {/* Installation */}
      {value.installation && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Installation</h3>
          <div className="flex items-center space-x-3">
            <img
              src={value.installation.account.avatar_url}
              alt={value.installation.account.login}
              className="h-8 w-8 rounded-full object-cover bg-gray-100"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    value.installation!.account.login,
                  )}&background=0D8ABC&color=fff`;
              }}
            />
            <a
              href={value.installation.account.html_url}
              className="text-sm font-medium text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {value.installation.account.login}
            </a>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <LucideReact.Package
              size={16}
              className="mr-2 text-gray-400"
              aria-hidden="true"
            />
            Repositories:{" "}
            <span className="font-medium">
              {value.installation.repository_selection === "all"
                ? "All"
                : "Selected"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

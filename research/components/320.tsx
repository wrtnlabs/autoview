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
  const createdDate = new Date(value.created_at).toLocaleString();
  const updatedDate = new Date(value.updated_at).toLocaleString();
  const expiresDate = value.expires_at ? new Date(value.expires_at) : null;
  const isExpired = expiresDate ? expiresDate < new Date() : false;
  const expiresLabel = expiresDate ? expiresDate.toLocaleString() : "Never";
  const scopeList = value.scopes ?? [];
  const displayedScopes =
    scopeList.length > 3 ? scopeList.slice(0, 3) : scopeList;
  const remainingScopesCount = scopeList.length - displayedScopes.length;

  const actor = value.user ?? value.installation?.account;
  const actorType = value.user
    ? "User"
    : value.installation
      ? "Installation"
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* App Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          {value.app.name}
        </h2>
        <a
          href={value.app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
          aria-label="Application URL"
        >
          <LucideReact.Link size={20} />
        </a>
      </div>

      {/* Associated User or Installation */}
      {actor && (
        <div className="flex items-center mt-4">
          <img
            src={actor.avatar_url}
            alt={actor.login}
            className="w-8 h-8 rounded-full object-cover mr-2"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                actor.login,
              )}&background=0D8ABC&color=fff`;
            }}
          />
          <a
            href={actor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            {actor.login}
          </a>
          {actorType && (
            <span className="ml-2 text-sm text-gray-500">{actorType}</span>
          )}
        </div>
      )}

      {/* Token Info */}
      <div className="flex items-center mt-4 text-gray-700">
        <LucideReact.Key size={16} className="mr-1" />
        <span>Token ending in {value.token_last_eight ?? "••••"}</span>
      </div>

      {/* Scopes */}
      <div className="mt-4">
        <div className="flex items-center text-gray-700">
          <LucideReact.Tag size={16} className="mr-1" />
          <span className="font-medium">Scopes:</span>
        </div>
        {scopeList.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {displayedScopes.map((scope) => (
              <span
                key={scope}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
              >
                {scope}
              </span>
            ))}
            {remainingScopesCount > 0 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                +{remainingScopesCount} more
              </span>
            )}
          </div>
        ) : (
          <div className="mt-2 text-gray-500 italic">No scopes assigned</div>
        )}
      </div>

      {/* Fingerprint */}
      {value.fingerprint && (
        <div className="flex items-center mt-4 text-gray-700">
          <LucideReact.Hash size={16} className="mr-1" />
          <span>Fingerprint: {value.fingerprint}</span>
        </div>
      )}

      {/* Note and Note URL */}
      {value.note && (
        <div className="mt-4 px-4 py-2 bg-gray-50 text-gray-600 italic rounded">
          “{value.note}”
        </div>
      )}
      {value.note_url && (
        <div className="flex items-center mt-2">
          <LucideReact.Link size={16} className="text-gray-500" />
          <a
            href={value.note_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-500 hover:underline text-sm"
          >
            {value.note_url}
          </a>
        </div>
      )}

      {/* Dates */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 text-sm">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Updated: {updatedDate}</span>
        </div>
        <div className="flex items-center col-span-full sm:col-auto">
          {isExpired ? (
            <LucideReact.AlertTriangle
              size={16}
              className="mr-1 text-red-500"
            />
          ) : (
            <LucideReact.Clock size={16} className="mr-1 text-gray-500" />
          )}
          <span>
            Expires: {expiresLabel}
            {isExpired && <span className="text-red-500 ml-1">(Expired)</span>}
          </span>
        </div>
      </div>
    </div>
  );
}

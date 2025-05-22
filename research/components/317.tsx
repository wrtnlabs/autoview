import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Installation
   *
   * @title Installation
   */
  export type installation = {
    /**
     * The ID of the installation.
     */
    id: number & tags.Type<"int32">;
    account:
      | AutoViewInputSubTypes.simple_user
      | AutoViewInputSubTypes.enterprise
      | null;
    /**
     * Describe whether all repositories have been selected or there's a selection involved
     */
    repository_selection: "all" | "selected";
    access_tokens_url: string & tags.Format<"uri">;
    repositories_url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    app_id: number & tags.Type<"int32">;
    /**
     * The ID of the user or organization this token is being scoped to.
     */
    target_id: number & tags.Type<"int32">;
    target_type: string;
    permissions: AutoViewInputSubTypes.app_permissions;
    events: string[];
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    single_file_name: string | null;
    has_multiple_single_files?: boolean;
    single_file_paths?: string[];
    app_slug: string;
    suspended_by: AutoViewInputSubTypes.nullable_simple_user;
    suspended_at: (string & tags.Format<"date-time">) | null;
    contact_email?: string | null;
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
  /**
   * An enterprise on GitHub.
   *
   * @title Enterprise
   */
  export type enterprise = {
    /**
     * A short description of the enterprise.
     */
    description?: string | null;
    html_url: string & tags.Format<"uri">;
    /**
     * The enterprise's website URL.
     */
    website_url?: (string & tags.Format<"uri">) | null;
    /**
     * Unique identifier of the enterprise
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * The name of the enterprise.
     */
    name: string;
    /**
     * The slug url identifier for the enterprise.
     */
    slug: string;
    created_at: (string & tags.Format<"date-time">) | null;
    updated_at: (string & tags.Format<"date-time">) | null;
    avatar_url: string & tags.Format<"uri">;
  };
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
}
export type AutoViewInput = AutoViewInputSubTypes.installation;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const account = value.account;
  const isSuspended = Boolean(value.suspended_at);
  const displayAccountName = account
    ? "login" in account
      ? account.login
      : (account.name ?? account.slug)
    : "Unknown";
  const accountAvatar = account?.avatar_url;
  const accountType =
    account && "login" in account ? "User" : account ? "Enterprise" : "N/A";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayAccountName,
  )}&background=0D8ABC&color=fff`;

  const eventsToShow = value.events.slice(0, 3);
  const remainingEvents = value.events.length - eventsToShow.length;

  const permEntries = Object.entries(value.permissions).filter(
    ([_, v]) => v != null,
  );
  const displayedPerms = permEntries.slice(0, 3);
  const remainingPerms = permEntries.length - displayedPerms.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Account Header */}
      <div className="flex items-center space-x-3">
        <img
          src={accountAvatar || avatarFallback}
          alt={displayAccountName}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = avatarFallback;
          }}
          className="w-10 h-10 rounded-full object-cover bg-gray-100"
        />
        <div className="flex-1">
          <div className="flex items-center gap-1 text-lg font-semibold text-gray-900">
            {accountType === "Enterprise" ? (
              <LucideReact.Building
                size={16}
                className="text-gray-500"
                aria-hidden
              />
            ) : (
              <LucideReact.User
                size={16}
                className="text-gray-500"
                aria-hidden
              />
            )}
            <span>{displayAccountName}</span>
          </div>
          <div className="text-sm text-gray-500">{accountType} Account</div>
        </div>
      </div>

      {/* Quick Badges */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded">
          <LucideReact.Tag
            size={16}
            className="mr-1 text-indigo-500"
            aria-hidden
          />
          <span className="font-medium">{value.app_slug}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded">
          <LucideReact.GitBranch
            size={16}
            className="mr-1 text-green-500"
            aria-hidden
          />
          <span className="capitalize">
            {value.repository_selection} repositories
          </span>
        </div>
        {value.contact_email && (
          <div className="flex items-center text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded">
            <LucideReact.Mail
              size={16}
              className="mr-1 text-blue-500"
              aria-hidden
            />
            <span className="truncate">{value.contact_email}</span>
          </div>
        )}
        {isSuspended && (
          <div className="flex items-center text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
            <LucideReact.AlertTriangle size={16} className="mr-1" aria-hidden />
            <span>Suspended</span>
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" aria-hidden />
          <span>Created: {formatDate(value.created_at)}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Clock size={16} className="mr-1" aria-hidden />
          <span>Updated: {formatDate(value.updated_at)}</span>
        </div>
        {isSuspended && value.suspended_at && (
          <div className="flex items-center col-span-2 text-red-600">
            <LucideReact.AlertTriangle size={16} className="mr-1" aria-hidden />
            <span>Suspended at {formatDate(value.suspended_at)}</span>
          </div>
        )}
      </div>

      {/* Events */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-medium text-gray-800">
          <span>Events ({value.events.length})</span>
          {value.events.length === 0 && (
            <LucideReact.AlertCircle
              size={16}
              className="text-gray-400"
              aria-hidden
            />
          )}
        </div>
        {value.events.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {eventsToShow.map((evt, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded"
              >
                {evt}
              </span>
            ))}
            {remainingEvents > 0 && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                +{remainingEvents} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Permissions */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-medium text-gray-800">
          <span>Permissions ({permEntries.length})</span>
          {permEntries.length === 0 && (
            <LucideReact.Key size={16} className="text-gray-400" aria-hidden />
          )}
        </div>
        {permEntries.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {displayedPerms.map(([key, level]) => (
              <span
                key={key}
                className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded capitalize"
              >
                {key.replace(/_/g, " ")}: {level}
              </span>
            ))}
            {remainingPerms > 0 && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                +{remainingPerms} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

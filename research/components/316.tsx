import LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.installation[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const installations = value;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (!installations || installations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <p className="text-lg">No installations found.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {installations.map((inst) => {
        // Derived values
        const account = inst.account;
        const isUser = account && "login" in account;
        const accountName = isUser
          ? (account as AutoViewInputSubTypes.simple_user).login
          : account
            ? (account as AutoViewInputSubTypes.enterprise).name
            : "—";
        const avatarUrl =
          account?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            accountName,
          )}&background=0D8ABC&color=fff`;
        const eventsCount = inst.events.length;
        const permissionCount = Object.values(inst.permissions || {}).filter(
          (v) => v !== undefined,
        ).length;
        const singleFileCount = inst.has_multiple_single_files
          ? inst.single_file_paths?.length || 0
          : inst.single_file_name
            ? 1
            : 0;

        return (
          <li
            key={inst.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col space-y-3"
          >
            {/* Header: Account */}
            <div className="flex items-center space-x-3">
              <img
                src={avatarUrl}
                alt={`${accountName} avatar`}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    accountName,
                  )}&background=ccc&color=555`;
                }}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {accountName}
                </p>
                <p className="text-xs text-gray-500">
                  {isUser ? (
                    <LucideReact.User
                      size={14}
                      className="inline-block mr-1 text-gray-400"
                    />
                  ) : (
                    <LucideReact.Briefcase
                      size={14}
                      className="inline-block mr-1 text-gray-400"
                    />
                  )}
                  {isUser ? "User" : account ? "Enterprise" : "N/A"}
                </p>
              </div>
            </div>

            {/* Core Identifiers */}
            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex items-center">
                <LucideReact.Hash size={16} className="text-gray-400 mr-1" />
                <span>App ID: {inst.app_id}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Tag size={16} className="text-gray-400 mr-1" />
                <span className="truncate">Slug: {inst.app_slug}</span>
              </div>
            </div>

            {/* Status Row */}
            <div className="flex flex-wrap items-center text-xs text-gray-600 gap-3">
              <div className="flex items-center">
                {inst.repository_selection === "all" ? (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500 mr-1"
                    aria-label="All repositories"
                  />
                ) : (
                  <LucideReact.List
                    size={16}
                    className="text-blue-500 mr-1"
                    aria-label="Selected repositories"
                  />
                )}
                <span>
                  {inst.repository_selection === "all"
                    ? "All repos"
                    : "Selected repos"}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.Activity
                  size={16}
                  className="text-gray-400 mr-1"
                  aria-label="Events"
                />
                <span>{eventsCount} events</span>
              </div>
              <div className="flex items-center">
                <LucideReact.GitBranch
                  size={16}
                  className="text-gray-400 mr-1"
                  aria-label="Permissions"
                />
                <span>{permissionCount} perms</span>
              </div>
              {singleFileCount > 0 && (
                <div className="flex items-center">
                  <LucideReact.FileText
                    size={16}
                    className="text-gray-400 mr-1"
                    aria-label="Single-file scopes"
                  />
                  <span>
                    {singleFileCount} file{singleFileCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>

            {/* Dates & Contact */}
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex items-center">
                <LucideReact.Calendar size={14} className="mr-1" />
                <span>Created: {formatDate(inst.created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar size={14} className="mr-1" />
                <span>Updated: {formatDate(inst.updated_at)}</span>
              </div>
              {inst.contact_email && (
                <div className="flex items-center">
                  <LucideReact.Mail size={14} className="mr-1" />
                  <span className="truncate">{inst.contact_email}</span>
                </div>
              )}
            </div>

            {/* Suspension */}
            {inst.suspended_at && inst.suspended_by && (
              <div className="flex items-center text-xs text-red-600">
                <LucideReact.AlertTriangle size={16} className="mr-1" />
                <span>
                  Suspended on {formatDate(inst.suspended_at)} by{" "}
                  {
                    (inst.suspended_by as AutoViewInputSubTypes.simple_user)
                      .login
                  }
                </span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

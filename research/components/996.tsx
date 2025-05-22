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
  const account = value.account;
  const isEnterprise = Boolean(account && "slug" in account);
  const accountName = account
    ? isEnterprise
      ? (account as AutoViewInputSubTypes.enterprise).name
      : (account as AutoViewInputSubTypes.simple_user).login
    : "Unknown Account";
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    accountName,
  )}&background=0D8ABC&color=fff`;

  const [avatarSrc, setAvatarSrc] = React.useState<string>(
    account?.avatar_url ?? defaultAvatar,
  );
  React.useEffect(() => {
    setAvatarSrc(account?.avatar_url ?? defaultAvatar);
  }, [account?.avatar_url, defaultAvatar]);

  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const isSuspended = Boolean(value.suspended_at);
  const suspendedAt = value.suspended_at
    ? new Date(value.suspended_at).toLocaleString()
    : "";

  const permissionEntries = Object.entries(value.permissions).filter(
    ([, level]) => level !== undefined,
  ) as [string, "read" | "write" | "admin"][];

  const formatPerm = (key: string) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto space-y-4">
      {/* App Title */}
      <div className="flex items-center space-x-2">
        <LucideReact.Package size={20} className="text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          {value.app_slug} (#{value.app_id})
        </h2>
      </div>

      {/* Account Info */}
      <div className="flex items-center space-x-3">
        <img
          src={avatarSrc}
          alt="Account Avatar"
          className="w-10 h-10 rounded-full object-cover"
          onError={() => setAvatarSrc(defaultAvatar)}
        />
        <div className="flex flex-col">
          <div className="flex items-center space-x-1 text-gray-800 font-medium">
            {isEnterprise ? (
              <LucideReact.Building size={16} className="text-gray-500" />
            ) : (
              <LucideReact.User size={16} className="text-gray-500" />
            )}
            <span>{accountName}</span>
          </div>
          <span className="text-xs text-gray-500">
            {isEnterprise ? "Enterprise" : "User"}
          </span>
        </div>
      </div>

      {/* Installation Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Installed: {createdAt}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.RefreshCw size={16} />
          <span>Updated: {updatedAt}</span>
        </div>
        <div className="flex items-center space-x-1 sm:col-span-2">
          <LucideReact.GitBranch size={16} />
          <span>
            Repositories:{" "}
            {value.repository_selection === "all" ? "All" : "Selected"}
          </span>
        </div>
        {value.contact_email && (
          <div className="flex items-center space-x-1">
            <LucideReact.Mail size={16} className="text-gray-400" />
            <span>{value.contact_email}</span>
          </div>
        )}
        {isSuspended && value.suspended_by && (
          <div className="flex items-center space-x-1 sm:col-span-2 text-red-600">
            <LucideReact.AlertTriangle size={16} />
            <span>
              Suspended on {suspendedAt} by{" "}
              {(value.suspended_by as AutoViewInputSubTypes.simple_user).login}
            </span>
          </div>
        )}
      </div>

      {/* Permissions */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Permissions</h3>
        <div className="flex flex-wrap gap-2">
          {permissionEntries.length > 0 ? (
            permissionEntries.map(([perm, level]) => (
              <span
                key={perm}
                className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
              >
                {formatPerm(perm)}: {level}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">
              No permissions defined
            </span>
          )}
        </div>
      </div>

      {/* Events */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Events</h3>
        <div className="flex flex-wrap gap-2">
          {value.events.length > 0 ? (
            value.events.map((event) => (
              <span
                key={event}
                className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
              >
                {event}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No events</span>
          )}
        </div>
      </div>

      {/* Single-file details */}
      {value.single_file_name && (
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <LucideReact.FileText size={16} />
          <span>Single File: {value.single_file_name}</span>
          {value.has_multiple_single_files && value.single_file_paths && (
            <span className="text-gray-500">
              (+{value.single_file_paths.length} more)
            </span>
          )}
        </div>
      )}
    </div>
  );
}

import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Installation
     *
     * @title Installation
    */
    export interface installation {
        /**
         * The ID of the installation.
        */
        id: number & tags.Type<"int32">;
        account: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.enterprise | null;
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
    /**
     * An enterprise on GitHub.
     *
     * @title Enterprise
    */
    export interface enterprise {
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
    }
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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive formatted dates and counts
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const suspendedAt = value.suspended_at ? new Date(value.suspended_at).toLocaleString() : null;

  const permissionEntries = Object.entries(value.permissions) as [string, string | undefined][];
  const grantedPermissions = permissionEntries.filter(([_, mode]) => mode !== undefined);
  const permissionCount = grantedPermissions.length;

  const eventsCount = value.events.length;

  // 2. Prepare account display (simple_user or enterprise)
  let accountDisplay: React.ReactNode = (
    <span className="italic text-gray-500 text-sm">No account assigned</span>
  );
  if (value.account) {
    if ("login" in value.account) {
      // simple_user
      const login = value.account.login;
      const avatarUrl = value.account.avatar_url;
      accountDisplay = (
        <div className="flex items-center gap-2">
          <img
            src={avatarUrl}
            alt={login}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                login,
              )}&background=0D8ABC&color=fff`;
            }}
          />
          <span className="text-sm font-medium text-gray-800 truncate">{login}</span>
        </div>
      );
    } else {
      // enterprise
      const name = value.account.name;
      const avatarUrl = value.account.avatar_url;
      accountDisplay = (
        <div className="flex items-center gap-2">
          <img
            src={avatarUrl}
            alt={name}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/32x32/e2e8f0/1e293b?text=${encodeURIComponent(
                name.charAt(0),
              )}`;
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-800 truncate">{name}</span>
            <span className="text-xs text-gray-500 uppercase">Enterprise</span>
          </div>
        </div>
      );
    }
  }

  // 3. Check suspension status
  const isSuspended = !!(value.suspended_at && value.suspended_by);
  const suspendedBy = value.suspended_by?.login ?? "";

  // 4. Compose visual structure
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm max-w-md mx-auto">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{value.app_slug}</h2>
        <p className="text-sm text-gray-500">App ID: {value.app_id}</p>
      </div>

      {/* Details List */}
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <LucideReact.User size={16} className="text-gray-500" />
          <span className="text-gray-600">Account:</span>
          {accountDisplay}
        </li>
        <li className="flex items-center gap-2">
          <LucideReact.Folder size={16} className="text-gray-500" />
          <span className="text-gray-600">Repositories:</span>
          <span className="font-medium text-gray-800">
            {value.repository_selection === "all" ? "All Repositories" : "Selected Repositories"}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <LucideReact.Key size={16} className="text-gray-500" />
          <span className="text-gray-600">Permissions:</span>
          <span className="font-medium text-gray-800">{permissionCount} granted</span>
        </li>
        <li className="flex items-center gap-2">
          <LucideReact.Bell size={16} className="text-gray-500" />
          <span className="text-gray-600">Events:</span>
          <span className="font-medium text-gray-800">{eventsCount} subscribed</span>
        </li>
        <li className="flex items-center gap-2">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="text-gray-600">Created:</span>
          <span className="font-medium text-gray-800">{createdAt}</span>
        </li>
        <li className="flex items-center gap-2">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="text-gray-600">Updated:</span>
          <span className="font-medium text-gray-800">{updatedAt}</span>
        </li>
        {value.single_file_name && (
          <li className="flex items-center gap-2">
            <LucideReact.FileText size={16} className="text-gray-500" />
            <span className="text-gray-600">Single File:</span>
            <span className="font-medium text-gray-800 truncate">{value.single_file_name}</span>
          </li>
        )}
        {isSuspended && (
          <li className="flex items-center gap-2 text-red-600">
            <LucideReact.XCircle size={16} />
            <span className="text-red-600">Suspended:</span>
            <span className="font-medium">
              {suspendedBy} on {suspendedAt}
            </span>
          </li>
        )}
        {value.contact_email && (
          <li className="flex items-center gap-2">
            <LucideReact.Mail size={16} className="text-gray-500" />
            <span className="text-gray-600">Contact:</span>
            <span className="font-medium text-gray-800 truncate">{value.contact_email}</span>
          </li>
        )}
      </ul>
    </div>
  );
}

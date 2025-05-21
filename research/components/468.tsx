import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsInstallations {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            installations: AutoViewInputSubTypes.installation[];
        };
    }
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
        account: any | any | null;
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
    export type simple_user = any;
    export type enterprise = any;
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsInstallations.GetResponse;



// The component name is always "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedTotal = new Intl.NumberFormat().format(value.total_count);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-gray-800">
          Installations ({formattedTotal})
        </h2>
      </header>

      {value.installations.map((inst) => {
        // Derive account name if available
        const accountName =
          inst.account && typeof inst.account === "object"
            ? // @ts-ignore
              inst.account.login || // @ts-ignore
              inst.account.name ||
              "N/A"
            : "N/A";

        // Format dates
        const formattedCreated = new Date(inst.created_at).toLocaleString();
        const formattedUpdated = new Date(inst.updated_at).toLocaleString();
        const formattedSuspendedAt = inst.suspended_at
          ? new Date(inst.suspended_at).toLocaleString()
          : "";

        // Prepare events list and permissions count
        const events = inst.events || [];
        const permissionEntries = inst.permissions
          ? Object.entries(inst.permissions)
          : [];
        const permissionCount = permissionEntries.filter(
          ([, v]) => v !== undefined
        ).length;

        // Suspended info
        const suspendedByName =
          inst.suspended_by && typeof inst.suspended_by === "object"
            ? inst.suspended_by.login || inst.suspended_by.name
            : null;

        return (
          <div
            key={inst.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 truncate">
                  {inst.app_slug}
                </h3>
                <span
                  className={`mt-1 inline-block text-sm font-medium ${
                    inst.repository_selection === "all"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {inst.repository_selection === "all"
                    ? "All Repositories"
                    : "Selected Repositories"}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
              <div>ID: {inst.id}</div>
              <div>Account: {accountName}</div>
              <div>
                Target: {inst.target_type} (ID: {inst.target_id})
              </div>
              {inst.contact_email && <div>Contact: {inst.contact_email}</div>}
              <div>Created: {formattedCreated}</div>
              <div>Updated: {formattedUpdated}</div>
              {inst.single_file_name != null && (
                <div>
                  Single File: {inst.single_file_name}
                  {inst.has_multiple_single_files ? " (multiple)" : ""}
                </div>
              )}
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">Events</h4>
              <div className="mt-2 flex flex-wrap gap-1">
                {events.slice(0, 5).map((e, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
                  >
                    {e}
                  </span>
                ))}
                {events.length > 5 && (
                  <span className="text-xs text-gray-500">
                    +{events.length - 5} more
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
              <div>Permissions: {permissionCount}</div>
              {suspendedByName && (
                <div className="text-red-600">
                  Suspended by {suspendedByName} at {formattedSuspendedAt}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

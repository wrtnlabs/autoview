import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.installation;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived constants
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formattedCreated = formatDate(value.created_at);
  const formattedUpdated = formatDate(value.updated_at);

  const isSuspended = !!(value.suspended_at && value.suspended_by);
  const formattedSuspendedAt = value.suspended_at
    ? formatDate(value.suspended_at)
    : null;

  const permissionEntries = Object.entries(value.permissions || {}).filter(
    ([, v]) => v !== undefined
  ) as [string, "read" | "write" | "admin" | undefined][];

  const humanize = (key: string) =>
    key
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const repoSelectionLabel =
    value.repository_selection === "all"
      ? "All Repositories"
      : "Selected Repositories";

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow px-6 py-5 space-y-4">
      <header className="border-b pb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Installation Overview
        </h2>
      </header>

      <dl className="grid grid-cols-1 gap-y-2">
        <div className="flex justify-between">
          <dt className="text-gray-600">App Slug:</dt>
          <dd className="text-gray-900 font-medium">{value.app_slug}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">App ID:</dt>
          <dd className="text-gray-900 font-medium">{value.app_id}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Installation ID:</dt>
          <dd className="text-gray-900 font-medium">{value.id}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Repository Selection:</dt>
          <dd className="text-gray-900 font-medium">{repoSelectionLabel}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Events Monitored:</dt>
          <dd className="text-gray-900 font-medium">
            {value.events.length}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Created At:</dt>
          <dd className="text-gray-900 font-medium">{formattedCreated}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Updated At:</dt>
          <dd className="text-gray-900 font-medium">{formattedUpdated}</dd>
        </div>
        {value.single_file_name != null && (
          <div className="flex justify-between">
            <dt className="text-gray-600">Managed File:</dt>
            <dd className="text-gray-900 font-medium">
              {value.single_file_name}
              {value.has_multiple_single_files &&
                value.single_file_paths && (
                  <span className="ml-2 text-xs text-gray-500">
                    ({value.single_file_paths.length} files)
                  </span>
                )}
            </dd>
          </div>
        )}
        {value.contact_email != null && (
          <div className="flex justify-between">
            <dt className="text-gray-600">Contact Email:</dt>
            <dd className="text-gray-900 font-medium">{value.contact_email}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-gray-600">Access Tokens URL:</dt>
          <dd className="text-blue-600 text-sm truncate max-w-xs">
            {value.access_tokens_url}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Repositories URL:</dt>
          <dd className="text-blue-600 text-sm truncate max-w-xs">
            {value.repositories_url}
          </dd>
        </div>
        <div className="flex justify-between items-center">
          <dt className="text-gray-600">Status:</dt>
          <dd>
            {isSuspended ? (
              <span className="px-2 py-0.5 text-sm bg-red-100 text-red-800 rounded-full">
                Suspended on {formattedSuspendedAt}
              </span>
            ) : (
              <span className="px-2 py-0.5 text-sm bg-green-100 text-green-800 rounded-full">
                Active
              </span>
            )}
          </dd>
        </div>
      </dl>

      {permissionEntries.length > 0 && (
        <section>
          <h3 className="text-gray-700 font-medium mb-2">Permissions</h3>
          <ul className="flex flex-wrap gap-2">
            {permissionEntries.map(([key, level]) => (
              <li key={key}>
                <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                  {humanize(key)}: {level}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {value.suspended_by && (
        <section className="border-t pt-3 text-gray-700 text-sm">
          <p>
            Suspended By: <span className="font-medium">{value.suspended_by.login}</span>
          </p>
        </section>
      )}
    </div>
  );
}

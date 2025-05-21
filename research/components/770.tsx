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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const repoSelectionText =
    value.repository_selection === "all" ? "All repositories" : "Selected repositories";

  const permissions = value.permissions ?? {};
  const permEntries = Object.entries(permissions).filter(([, v]) => v != null) as [
    string,
    "read" | "write" | "admin"
  ][];
  const readCount = permEntries.filter(([, v]) => v === "read").length;
  const writeCount = permEntries.filter(([, v]) => v === "write").length;
  const adminCount = permEntries.filter(([, v]) => v === "admin").length;
  const permSummary = [
    readCount > 0 ? `${readCount} read` : null,
    writeCount > 0 ? `${writeCount} write` : null,
    adminCount > 0 ? `${adminCount} admin` : null,
  ]
    .filter(Boolean)
    .join(", ") || "No permissions";

  const eventList = value.events.slice(0, 5);
  const moreEvents = value.events.length - eventList.length;

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const createdAt = fmtDate(value.created_at);
  const updatedAt = fmtDate(value.updated_at);
  const suspendedAt = value.suspended_at ? fmtDate(value.suspended_at) : null;

  const status = suspendedAt
    ? `Suspended by ${value.suspended_by?.login ?? "unknown"} on ${suspendedAt}`
    : "Active";

  const singleFileInfo =
    value.single_file_name != null
      ? value.has_multiple_single_files && Array.isArray(value.single_file_paths)
        ? `${value.single_file_paths.length} files selected`
        : value.single_file_name
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-4">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          App "{value.app_slug}"
        </h2>
        <p className="text-sm text-gray-600">Status: {status}</p>
      </header>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
        <div>
          <dt className="font-medium text-gray-500">Repository Scope</dt>
          <dd className="mt-1 text-gray-900">{repoSelectionText}</dd>
        </div>

        <div>
          <dt className="font-medium text-gray-500">Permissions</dt>
          <dd className="mt-1 text-gray-900">{permSummary}</dd>
        </div>

        <div className="sm:col-span-2">
          <dt className="font-medium text-gray-500">Events ({value.events.length})</dt>
          <dd className="mt-1 flex flex-wrap">
            {eventList.map((evt) => (
              <span
                key={evt}
                className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-1 mb-1 px-2 py-0.5 rounded"
              >
                {evt}
              </span>
            ))}
            {moreEvents > 0 && (
              <span className="inline-block text-gray-500 text-xs ml-1">
                +{moreEvents} more
              </span>
            )}
          </dd>
        </div>

        <div>
          <dt className="font-medium text-gray-500">Created</dt>
          <dd className="mt-1 text-gray-900">{createdAt}</dd>
        </div>

        <div>
          <dt className="font-medium text-gray-500">Updated</dt>
          <dd className="mt-1 text-gray-900">{updatedAt}</dd>
        </div>

        {singleFileInfo && (
          <div>
            <dt className="font-medium text-gray-500">Single File</dt>
            <dd className="mt-1 text-gray-900 truncate">{singleFileInfo}</dd>
          </div>
        )}

        {value.contact_email && (
          <div className="sm:col-span-2">
            <dt className="font-medium text-gray-500">Contact Email</dt>
            <dd className="mt-1 text-gray-900 truncate">{value.contact_email}</dd>
          </div>
        )}

        <div className="sm:col-span-2">
          <dt className="font-medium text-gray-500">Installation ID</dt>
          <dd className="mt-1 text-gray-400 text-xs">#{value.id}</dd>
        </div>
      </dl>
    </div>
  );
}

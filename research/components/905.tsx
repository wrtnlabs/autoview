import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Full Team
    */
    export type team_full = {
        /**
         * Unique identifier of the team
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the team
        */
        url: string;
        html_url: string & tags.Format<"uri">;
        /**
         * Name of the team
        */
        name: string;
        slug: string;
        description: string | null;
        /**
         * The level of privacy this team should have
        */
        privacy?: "closed" | "secret";
        /**
         * The notification setting the team has set
        */
        notification_setting?: "notifications_enabled" | "notifications_disabled";
        /**
         * Permission that the team will have for its repositories
        */
        permission: string;
        members_url: string;
        repositories_url: string & tags.Format<"uri">;
        parent?: AutoViewInputSubTypes.nullable_team_simple;
        members_count: number & tags.Type<"int32">;
        repos_count: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        organization: AutoViewInputSubTypes.team_organization;
        /**
         * Distinguished Name (DN) that team maps to within LDAP environment
        */
        ldap_dn?: string;
    };
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team Simple
    */
    export type nullable_team_simple = {
        /**
         * Unique identifier of the team
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the team
        */
        url: string & tags.Format<"uri">;
        members_url: string;
        /**
         * Name of the team
        */
        name: string;
        /**
         * Description of the team
        */
        description: string | null;
        /**
         * Permission that the team will have for its repositories
        */
        permission: string;
        /**
         * The level of privacy this team should have
        */
        privacy?: string;
        /**
         * The notification setting the team has set
        */
        notification_setting?: string;
        html_url: string & tags.Format<"uri">;
        repositories_url: string & tags.Format<"uri">;
        slug: string;
        /**
         * Distinguished Name (DN) that team maps to within LDAP environment
        */
        ldap_dn?: string;
    } | null;
    /**
     * Team Organization
     *
     * @title Team Organization
    */
    export type team_organization = {
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        hooks_url: string;
        issues_url: string;
        members_url: string;
        public_members_url: string;
        avatar_url: string;
        description: string | null;
        name?: string;
        company?: string;
        blog?: string & tags.Format<"uri">;
        location?: string;
        email?: string & tags.Format<"email">;
        twitter_username?: string | null;
        is_verified?: boolean;
        has_organization_projects: boolean;
        has_repository_projects: boolean;
        public_repos: number & tags.Type<"int32">;
        public_gists: number & tags.Type<"int32">;
        followers: number & tags.Type<"int32">;
        following: number & tags.Type<"int32">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        type: string;
        total_private_repos?: number & tags.Type<"int32">;
        owned_private_repos?: number & tags.Type<"int32">;
        private_gists?: (number & tags.Type<"int32">) | null;
        disk_usage?: (number & tags.Type<"int32">) | null;
        collaborators?: (number & tags.Type<"int32">) | null;
        billing_email?: (string & tags.Format<"email">) | null;
        plan?: {
            name: string;
            space: number & tags.Type<"int32">;
            private_repos: number & tags.Type<"int32">;
            filled_seats?: number & tags.Type<"int32">;
            seats?: number & tags.Type<"int32">;
        };
        default_repository_permission?: string | null;
        members_can_create_repositories?: boolean | null;
        two_factor_requirement_enabled?: boolean | null;
        members_allowed_repository_creation_type?: string;
        members_can_create_public_repositories?: boolean;
        members_can_create_private_repositories?: boolean;
        members_can_create_internal_repositories?: boolean;
        members_can_create_pages?: boolean;
        members_can_create_public_pages?: boolean;
        members_can_create_private_pages?: boolean;
        members_can_fork_private_repositories?: boolean | null;
        web_commit_signoff_required?: boolean;
        updated_at: string & tags.Format<"date-time">;
        archived_at: (string & tags.Format<"date-time">) | null;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.team_full;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    name,
    slug,
    description,
    privacy,
    permission,
    notification_setting,
    members_count,
    repos_count,
    parent,
    created_at,
    updated_at,
    organization,
  } = value;

  const formattedCreated = new Date(created_at).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedUpdated = new Date(updated_at).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const privacyLabel = privacy
    ? privacy.charAt(0).toUpperCase() + privacy.slice(1)
    : null;
  const permissionLabel =
    permission.charAt(0).toUpperCase() + permission.slice(1).toLowerCase();
  const notificationLabel = notification_setting
    ? notification_setting
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ")
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Team & Organization */}
      <div className="flex items-center space-x-4">
        <img
          src={organization.avatar_url}
          alt={`${organization.login} logo`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500">
            @{organization.login}/{slug}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 line-clamp-2">
        {description || "No description provided."}
      </p>

      {/* Badges: Privacy, Permission, Notification */}
      <div className="flex flex-wrap gap-2">
        {privacyLabel && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium rounded">
            {privacyLabel}
          </span>
        )}
        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
          {permissionLabel}
        </span>
        {notificationLabel && (
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            {notificationLabel}
          </span>
        )}
      </div>

      {/* Stats: Members, Repos, Parent */}
      <div className="flex flex-wrap text-sm text-gray-600 space-x-4">
        <span>{members_count} Members</span>
        <span>{repos_count} Repositories</span>
        {parent && parent.name && (
          <span>Parent: {parent.name}</span>
        )}
      </div>

      {/* Timestamps */}
      <div className="flex flex-wrap text-xs text-gray-500 space-x-4">
        <span>Created: {formattedCreated}</span>
        <span>Updated: {formattedUpdated}</span>
      </div>
    </div>
  );
}

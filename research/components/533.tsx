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
  const teamName = value.name;
  const teamSlug = value.slug;
  const description = value.description ?? "No description provided.";
  const memberCount = value.members_count.toLocaleString();
  const repoCount = value.repos_count.toLocaleString();
  const createdAt = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedAt = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const privacy = value.privacy ? value.privacy.charAt(0).toUpperCase() + value.privacy.slice(1) : null;
  const notification = value.notification_setting
    ? value.notification_setting.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : null;
  const permission = value.permission.charAt(0).toUpperCase() + value.permission.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{teamName}</h2>
          <p className="text-sm text-gray-500 truncate">slug: {teamSlug}</p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-gray-700 line-clamp-2">{description}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
          Permission: {permission}
        </span>
        {privacy && (
          <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
            Privacy: {privacy}
          </span>
        )}
        {notification && (
          <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
            Notifications: {notification}
          </span>
        )}
      </div>

      {/* Stats */}
      <ul className="flex space-x-6 mt-4 text-sm text-gray-600">
        <li>
          <span className="font-medium text-gray-800">{memberCount}</span> Members
        </li>
        <li>
          <span className="font-medium text-gray-800">{repoCount}</span> Repos
        </li>
      </ul>

      {/* Parent Team */}
      {value.parent && (
        <p className="mt-4 text-sm text-gray-600">
          Parent Team: <span className="font-medium text-gray-800">{value.parent.name}</span>
        </p>
      )}

      {/* Organization */}
      <div className="flex items-center mt-4 space-x-3">
        <img
          src={value.organization.avatar_url}
          alt={value.organization.login}
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="text-sm text-gray-600">
          Organization: <span className="font-medium text-gray-800">{value.organization.login}</span>
        </p>
      </div>

      {/* Timestamps */}
      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <p>Created: {createdAt}</p>
        <p>Updated: {updatedAt}</p>
      </div>
    </div>
  );
}

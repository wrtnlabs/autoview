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
  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

  const capitalize = (s: string): string =>
    s.charAt(0).toUpperCase() + s.slice(1);

  const formatSetting = (s?: string | null): string =>
    s
      ? s
          .split(/[_\s]+/)
          .map((word) => capitalize(word.toLowerCase()))
          .join(' ')
      : 'N/A';

  const createdAt = formatDate(value.created_at);
  const updatedAt = formatDate(value.updated_at);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Organization avatar and Team name */}
      <div className="flex items-center space-x-4">
        <img
          src={value.organization.avatar_url}
          alt={`${value.organization.login} avatar`}
          className="w-12 h-12 rounded-full flex-shrink-0"
        />
        <div className="flex-1 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.name}
          </h2>
          <p className="text-sm text-gray-500 truncate">/{value.slug}</p>
        </div>
      </div>

      {/* Optional Description */}
      {value.description && (
        <p className="mt-3 text-gray-700 text-sm line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Key Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium text-gray-800">
            {value.members_count}
          </span>{' '}
          members
        </div>
        <div>
          <span className="font-medium text-gray-800">
            {value.repos_count}
          </span>{' '}
          repositories
        </div>
        <div>
          <span className="font-medium text-gray-800">
            {capitalize(value.permission)}
          </span>{' '}
          permission
        </div>
        <div>
          <span className="font-medium text-gray-800">
            {formatSetting(value.privacy)}
          </span>{' '}
          privacy
        </div>
      </div>

      {/* Dates */}
      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <div>Created: {createdAt}</div>
        <div>Updated: {updatedAt}</div>
      </div>

      {/* Parent Team */}
      {value.parent && (
        <div className="mt-4 text-sm text-gray-700">
          <span className="font-medium text-gray-800">Parent Team:</span>{' '}
          {value.parent.name}
        </div>
      )}

      {/* Footer: Organization Details */}
      <div className="mt-5 pt-4 border-t border-gray-200 flex items-center space-x-3">
        <img
          src={value.organization.avatar_url}
          alt={`${value.organization.login} avatar`}
          className="w-8 h-8 rounded-full"
        />
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-gray-800 truncate">
            {value.organization.login}
          </p>
          {value.organization.name && (
            <p className="text-xs text-gray-500 truncate">
              {value.organization.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

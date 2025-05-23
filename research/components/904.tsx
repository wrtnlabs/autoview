import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Full Team
    */
    export interface team_full {
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
    }
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
        url: string;
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
    export interface team_organization {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.team_full;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreated = new Date(value.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formattedUpdated = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const privacyLabel = value.privacy
    ? value.privacy.charAt(0).toUpperCase() + value.privacy.slice(1)
    : 'Closed';
  const notificationLabel =
    value.notification_setting === 'notifications_enabled'
      ? 'Enabled'
      : value.notification_setting === 'notifications_disabled'
      ? 'Disabled'
      : '';
  const org = value.organization;
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    org.login,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Team & Organization Header */}
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={org.avatar_url}
            alt={`${org.login} avatar`}
            className="w-full h-full object-cover"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = avatarFallback;
            }}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">{value.name}</h2>
          {value.description && (
            <p className="text-gray-600 text-sm mt-1 line-clamp-3">
              {value.description}
            </p>
          )}
          <div className="flex items-center space-x-2 text-gray-500 text-sm mt-2">
            <LucideReact.Building size={16} className="flex-shrink-0" />
            <span>{org.login}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-gray-700 text-sm">
            <div className="flex items-center space-x-1">
              <LucideReact.Users size={16} className="text-gray-500" />
              <span>{value.members_count} members</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.Code size={16} className="text-gray-500" />
              <span>{value.repos_count} repos</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.Lock size={16} className="text-gray-500" />
              <span className="capitalize">{privacyLabel}</span>
            </div>
            {value.notification_setting && (
              <div className="flex items-center space-x-1">
                <LucideReact.Bell size={16} className="text-gray-500" />
                <span>{notificationLabel} notifications</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Parent Team Info */}
      {value.parent && (
        <div className="text-gray-700 text-sm">
          <span className="font-medium">Parent Team:</span>{' '}
          <span>{value.parent.name}</span>
        </div>
      )}

      {/* Links & Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-500 text-sm">
        <div className="flex items-center space-x-1 truncate">
          <LucideReact.Link size={16} />
          <span className="truncate">{value.html_url}</span>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.Calendar size={16} />
          <span>Created {formattedCreated}</span>
          <span>•</span>
          <span>Updated {formattedUpdated}</span>
        </div>
      </div>
    </div>
  );
}

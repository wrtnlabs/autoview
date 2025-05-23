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
export type AutoViewInput = AutoViewInputSubTypes.team_full[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <span className="text-lg">No teams available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {value.map((team) => (
        <div
          key={team.id}
          className="flex flex-col justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <header className="mb-3">
            <h2 className="text-xl font-semibold text-gray-800 truncate">
              {team.name}
            </h2>
            <div className="flex items-center text-gray-500 text-sm mt-1 space-x-1">
              <LucideReact.Users size={16} />
              <span>{team.members_count}</span>
              <LucideReact.Package size={16} className="ml-3" />
              <span>{team.repos_count}</span>
            </div>
          </header>

          <div className="mb-3 text-gray-600 text-sm line-clamp-2">
            {team.description ?? 'No description available.'}
          </div>

          <div className="flex items-center text-gray-500 text-sm space-x-4 mb-3">
            {team.privacy && (
              <div className="flex items-center space-x-1">
                <LucideReact.Lock size={16} />
                <span className="capitalize">{team.privacy}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <LucideReact.Tag size={16} />
              <span className="truncate">{team.permission}</span>
            </div>
          </div>

          {team.parent && (
            <div className="mb-3 text-gray-500 text-sm">
              <span className="font-medium">Parent:</span>{' '}
              <span>{team.parent.name}</span>
            </div>
          )}

          <footer className="flex flex-col text-gray-400 text-xs">
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar size={14} />
              <span>Created: {formatDate(team.created_at)}</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <LucideReact.Calendar size={14} />
              <span>Updated: {formatDate(team.updated_at)}</span>
            </div>
            <div className="flex items-center space-x-1 mt-1 truncate">
              <LucideReact.User size={14} />
              <span className="capitalize">{team.organization.login}</span>
            </div>
          </footer>
        </div>
      ))}
    </div>
  );
}

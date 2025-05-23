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
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const privacyBadge = value.privacy && (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${
        value.privacy === "secret"
          ? "bg-blue-100 text-blue-800"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {value.privacy.charAt(0).toUpperCase() + value.privacy.slice(1)}
    </span>
  );

  const notificationBadge = value.notification_setting && (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${
        value.notification_setting === "notifications_enabled"
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {value.notification_setting === "notifications_enabled"
        ? "Notifications On"
        : "Notifications Off"}
    </span>
  );

  const parentTeam = value.parent ? (
    <div className="flex items-center text-sm text-gray-600 mt-2">
      <LucideReact.ArrowUpRight size={16} className="text-gray-400 mr-1" />
      <span className="truncate">{value.parent.name}</span>
    </div>
  ) : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Users size={24} className="text-indigo-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <div className="ml-auto flex items-center space-x-1">
          {privacyBadge}
          {notificationBadge}
        </div>
      </div>

      {value.description && (
        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
          {value.description}
        </p>
      )}

      {parentTeam}

      <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
        <div className="flex items-center text-gray-600">
          <LucideReact.Users size={16} className="text-gray-500 mr-1" />
          <span>{value.members_count.toLocaleString()} members</span>
        </div>
        <div className="flex items-center text-gray-600">
          <LucideReact.GitBranch size={16} className="text-gray-500 mr-1" />
          <span>{value.repos_count.toLocaleString()} repos</span>
        </div>
        <div className="flex items-center text-gray-600">
          <LucideReact.Key size={16} className="text-gray-500 mr-1" />
          <span className="capitalize">{value.permission}</span>
        </div>
        {value.ldap_dn && (
          <div className="flex items-center text-gray-600 col-span-2">
            <LucideReact.Hash size={16} className="text-gray-500 mr-1" />
            <span className="truncate">{value.ldap_dn}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 mt-4 pt-3 text-xs text-gray-500 space-y-1">
        <div className="flex items-center">
          <LucideReact.Calendar size={14} className="mr-1" />
          <span>Created: {formatDate(value.created_at)}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.RefreshCw size={14} className="mr-1" />
          <span>Updated: {formatDate(value.updated_at)}</span>
        </div>
      </div>

      <div className="flex items-center mt-4">
        <img
          src={value.organization.avatar_url}
          alt={`${value.organization.login} avatar`}
          className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.currentTarget;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              value.organization.login
            )}&background=ddd&color=555`;
          }}
        />
        <div className="text-sm">
          <div className="font-medium text-gray-800 truncate">
            {value.organization.login}
          </div>
          {value.organization.name && (
            <div className="text-gray-500 truncate">
              {value.organization.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

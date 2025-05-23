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
  const description = value.description ?? "No description provided";
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
  const privacyLabel = value.privacy ?? "closed";
  const notificationLabel =
    value.notification_setting === "notifications_disabled"
      ? "Off"
      : value.notification_setting === "notifications_enabled"
      ? "On"
      : null;
  const org = value.organization;
  const orgName = org.name ?? org.login;
  const orgDesc = org.description ?? "";
  const orgAvatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    orgName,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-lg shadow">
      <header className="mb-3">
        <h2 className="text-xl font-semibold text-gray-900">{value.name}</h2>
        <p className="text-sm text-gray-500">{value.slug}</p>
      </header>
      <p className="text-gray-700 line-clamp-2">{description}</p>

      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} className="text-gray-500" />
          <span>{value.members_count} members</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Folder size={16} className="text-gray-500" />
          <span>{value.repos_count} repos</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Key size={16} className="text-gray-500" />
          <span>{value.permission}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Lock size={16} className="text-gray-500" />
          <span className="capitalize">{privacyLabel}</span>
        </div>
        {notificationLabel && (
          <div className="flex items-center gap-1">
            <LucideReact.Bell size={16} className="text-gray-500" />
            <span>Notifications {notificationLabel}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created {createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Updated {updatedAt}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src={org.avatar_url}
            alt={`${orgName} avatar`}
            onError={(e) => {
              e.currentTarget.src = orgAvatarFallback;
            }}
          />
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {orgName}
          </p>
          {orgDesc && (
            <p className="text-xs text-gray-500 truncate">{orgDesc}</p>
          )}
        </div>
        <a
          href={org.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center text-sm text-blue-500 hover:underline"
        >
          <LucideReact.Link size={16} className="mr-1" />
          View Org
        </a>
      </div>
    </div>
  );
}

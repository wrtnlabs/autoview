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
  const privacyLabel = value.privacy
    ? value.privacy.charAt(0).toUpperCase() + value.privacy.slice(1)
    : null;
  const privacyClasses =
    value.privacy === "secret"
      ? "bg-purple-100 text-purple-800"
      : "bg-blue-100 text-blue-800";
  const notificationLabel = value.notification_setting
    ? value.notification_setting === "notifications_enabled"
      ? "Notifications On"
      : "Notifications Off"
    : null;
  const notificationClasses =
    value.notification_setting === "notifications_enabled"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" }
  );
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" }
  );

  const descriptionText = value.description || "No description provided.";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Team Name and Slug */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{value.name}</h2>
        <p className="text-sm text-gray-500">@{value.slug}</p>
      </div>

      {/* Badges: Privacy & Notification */}
      <div className="flex flex-wrap gap-2">
        {privacyLabel && (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${privacyClasses}`}
          >
            {privacyLabel}
          </span>
        )}
        {notificationLabel && (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${notificationClasses}`}
          >
            {notificationLabel}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm line-clamp-3">{descriptionText}</p>

      {/* Stats: Members & Repositories */}
      <div className="flex space-x-6 text-sm text-gray-600">
        <div>
          <span className="font-medium text-gray-900">
            {value.members_count}
          </span>{" "}
          Members
        </div>
        <div>
          <span className="font-medium text-gray-900">{value.repos_count}</span>{" "}
          Repositories
        </div>
      </div>

      {/* Parent Team */}
      {value.parent && (
        <div className="text-sm text-gray-600">
          Parent Team:{" "}
          <span className="font-medium text-gray-900">
            {value.parent.name}
          </span>
        </div>
      )}

      {/* Organization Info */}
      <div className="flex items-center space-x-3">
        <img
          className="w-8 h-8 rounded-full"
          src={value.organization.avatar_url}
          alt={value.organization.login}
        />
        <a
          href={value.organization.html_url}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          {value.organization.login}
        </a>
      </div>

      {/* Timestamps */}
      <div className="text-xs text-gray-400">
        <time dateTime={value.created_at}>Created: {formattedCreatedAt}</time>{" "}
        &bull;{" "}
        <time dateTime={value.updated_at}>Updated: {formattedUpdatedAt}</time>
      </div>
    </div>
  );
}

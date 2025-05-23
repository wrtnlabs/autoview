import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Organization Full
     *
     * @title Organization Full
    */
    export interface organization_full {
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
        type: string;
        total_private_repos?: number & tags.Type<"int32">;
        owned_private_repos?: number & tags.Type<"int32">;
        private_gists?: (number & tags.Type<"int32">) | null;
        disk_usage?: (number & tags.Type<"int32">) | null;
        /**
         * The number of collaborators on private repositories.
         *
         * This field may be null if the number of private repositories is over 50,000.
        */
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
        /**
         * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
         *
         * Whether GitHub Advanced Security is enabled for new repositories and repositories transferred to this organization.
         *
         * This field is only visible to organization owners or members of a team with the security manager role.
         *
         * @deprecated
        */
        advanced_security_enabled_for_new_repositories?: boolean;
        /**
         * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
         *
         * Whether Dependabot alerts are automatically enabled for new repositories and repositories transferred to this organization.
         *
         * This field is only visible to organization owners or members of a team with the security manager role.
         *
         * @deprecated
        */
        dependabot_alerts_enabled_for_new_repositories?: boolean;
        /**
         * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
         *
         * Whether Dependabot security updates are automatically enabled for new repositories and repositories transferred to this organization.
         *
         * This field is only visible to organization owners or members of a team with the security manager role.
         *
         * @deprecated
        */
        dependabot_security_updates_enabled_for_new_repositories?: boolean;
        /**
         * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
         *
         * Whether dependency graph is automatically enabled for new repositories and repositories transferred to this organization.
         *
         * This field is only visible to organization owners or members of a team with the security manager role.
         *
         * @deprecated
        */
        dependency_graph_enabled_for_new_repositories?: boolean;
        /**
         * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
         *
         * Whether secret scanning is automatically enabled for new repositories and repositories transferred to this organization.
         *
         * This field is only visible to organization owners or members of a team with the security manager role.
         *
         * @deprecated
        */
        secret_scanning_enabled_for_new_repositories?: boolean;
        /**
         * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
         *
         * Whether secret scanning push protection is automatically enabled for new repositories and repositories transferred to this organization.
         *
         * This field is only visible to organization owners or members of a team with the security manager role.
         *
         * @deprecated
        */
        secret_scanning_push_protection_enabled_for_new_repositories?: boolean;
        /**
         * Whether a custom link is shown to contributors who are blocked from pushing a secret by push protection.
        */
        secret_scanning_push_protection_custom_link_enabled?: boolean;
        /**
         * An optional URL string to display to contributors who are blocked from pushing a secret.
        */
        secret_scanning_push_protection_custom_link?: string | null;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        archived_at: (string & tags.Format<"date-time">) | null;
        /**
         * Controls whether or not deploy keys may be added and used for repositories in the organization.
        */
        deploy_keys_enabled_for_repositories?: boolean;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.organization_full;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const fullName = value.name ?? value.login;
  const [avatarError, setAvatarError] = React.useState(false);
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fullName,
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = avatarError ? avatarFallback : value.avatar_url;

  const description = value.description ?? 'No description provided.';
  const truncatedDescription =
    description.length > 120 ? `${description.slice(0, 120)}…` : description;

  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(
    undefined,
    { year: 'numeric', month: 'long', day: 'numeric' },
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-lg overflow-hidden p-4">
      {/* Header: Avatar and Basic Info */}
      <div className="flex items-center">
        <img
          src={avatarSrc}
          alt={`${fullName} avatar`}
          onError={() => setAvatarError(true)}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            {fullName}
            {value.is_verified && (
              <LucideReact.BadgeCheck
                className="text-blue-500 ml-2"
                size={16}
                aria-label="Verified"
              />
            )}
          </h2>
          <p className="text-sm text-gray-500">@{value.login}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mt-3 line-clamp-2">
        {truncatedDescription}
      </p>

      {/* Key Stats */}
      <div className="flex flex-wrap justify-between items-center mt-4 text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Archive size={16} />
          <span className="text-sm">{value.public_repos} Repos</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.BookOpen size={16} />
          <span className="text-sm">{value.public_gists} Gists</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} />
          <span className="text-sm">{value.followers} Followers</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.User size={16} />
          <span className="text-sm">{value.following} Following</span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 space-y-2 text-gray-600 text-sm">
        {value.company && (
          <div className="flex items-center gap-1">
            <LucideReact.Building size={16} />
            <span>{value.company}</span>
          </div>
        )}
        {value.blog && (
          <div className="flex items-center gap-1">
            <LucideReact.Link size={16} />
            <span className="truncate">{value.blog}</span>
          </div>
        )}
        {value.location && (
          <div className="flex items-center gap-1">
            <LucideReact.MapPin size={16} />
            <span>{value.location}</span>
          </div>
        )}
        {value.email && (
          <div className="flex items-center gap-1">
            <LucideReact.Mail size={16} />
            <span>{value.email}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Joined {formattedCreatedAt}</span>
        </div>
      </div>
    </div>
  );
}

import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Organization Full
     *
     * @title Organization Full
    */
    export type organization_full = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.organization_full;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName = value.name ?? value.login;
  const formattedCreatedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedUpdatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formatNumber = (n: number) => n.toLocaleString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header with avatar and name */}
      <div className="flex items-center p-4">
        <img
          src={value.avatar_url}
          alt="Organization Avatar"
          className="w-16 h-16 rounded-full flex-shrink-0"
        />
        <div className="ml-4 flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{displayName}</h2>
          <p className="text-gray-600">@{value.login}</p>
          <div className="flex items-center mt-1 space-x-2">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
              {value.type}
            </span>
            {value.is_verified && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="px-4 text-gray-700 text-sm line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Key Details */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 p-4 text-sm text-gray-700">
        {value.location && (
          <div>
            <dt className="font-medium">Location</dt>
            <dd className="truncate">{value.location}</dd>
          </div>
        )}
        {value.blog && (
          <div>
            <dt className="font-medium">Website</dt>
            <dd className="truncate">{value.blog}</dd>
          </div>
        )}
        {value.email && (
          <div>
            <dt className="font-medium">Email</dt>
            <dd className="truncate">{value.email}</dd>
          </div>
        )}
        {value.twitter_username && (
          <div>
            <dt className="font-medium">Twitter</dt>
            <dd className="truncate">@{value.twitter_username}</dd>
          </div>
        )}
        <div>
          <dt className="font-medium">Joined</dt>
          <dd>{formattedCreatedDate}</dd>
        </div>
        <div>
          <dt className="font-medium">Updated</dt>
          <dd>{formattedUpdatedDate}</dd>
        </div>
      </dl>

      {/* Statistics */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap -m-1">
          <div className="m-1 px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            Repos: {formatNumber(value.public_repos)}
          </div>
          <div className="m-1 px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            Gists: {formatNumber(value.public_gists)}
          </div>
          <div className="m-1 px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            Followers: {formatNumber(value.followers)}
          </div>
          <div className="m-1 px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            Following: {formatNumber(value.following)}
          </div>
        </div>
      </div>
    </div>
  );
}

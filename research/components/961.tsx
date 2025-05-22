import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Org Membership
     *
     * @title Org Membership
    */
    export type org_membership = {
        url: string & tags.Format<"uri">;
        /**
         * The state of the member in the organization. The `pending` state indicates the user has not yet accepted an invitation.
        */
        state: "active" | "pending";
        /**
         * The user's membership type in the organization.
        */
        role: "admin" | "member" | "billing_manager";
        organization_url: string & tags.Format<"uri">;
        organization: AutoViewInputSubTypes.organization_simple;
        user: AutoViewInputSubTypes.nullable_simple_user;
        permissions?: {
            can_create_repository: boolean;
        };
    };
    /**
     * A GitHub organization.
     *
     * @title Organization Simple
    */
    export type organization_simple = {
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
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        avatar_url: string & tags.Format<"uri">;
        gravatar_id: string | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        followers_url: string & tags.Format<"uri">;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string & tags.Format<"uri">;
        organizations_url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string;
        received_events_url: string & tags.Format<"uri">;
        type: string;
        site_admin: boolean;
        starred_at?: string;
        user_view_type?: string;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.org_membership[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const memberships = value || [];

  const stateStyles = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
  } as const;

  const roleStyles = {
    admin: 'bg-blue-100 text-blue-800',
    member: 'bg-gray-100 text-gray-800',
    billing_manager: 'bg-purple-100 text-purple-800',
  } as const;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (memberships.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No organization memberships available.
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {memberships.map((membership, index) => {
        const { organization, state, role, permissions } = membership;
        const { login, avatar_url, description } = organization;
        const stateLabel = state.charAt(0).toUpperCase() + state.slice(1);
        const roleLabel = role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        return (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-150"
          >
            <div className="flex items-center space-x-4">
              <img
                src={avatar_url}
                alt={`${login} avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{login}</h3>
                {description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {description}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${stateStyles[state]}`}
              >
                {stateLabel}
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${roleStyles[role]}`}
              >
                {roleLabel}
              </span>
              {permissions?.can_create_repository && (
                <span className="px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-800">
                  Can Create Repos
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

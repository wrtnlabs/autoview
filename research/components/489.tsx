import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The Relationship a User has with a role.
     *
     * @title A Role Assignment for a User
    */
    export type user_role_assignment = {
        /**
         * Determines if the user has a direct, indirect, or mixed relationship to a role
        */
        assignment?: "direct" | "indirect" | "mixed";
        /**
         * Team the user has gotten the role through
        */
        inherited_from?: AutoViewInputSubTypes.team_simple[];
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
    };
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team Simple
    */
    export type team_simple = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.user_role_assignment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatAssignmentType = (
    assignment?: "direct" | "indirect" | "mixed"
  ): { label: string; colorClass: string } => {
    switch (assignment) {
      case "direct":
        return { label: "Direct", colorClass: "bg-green-100 text-green-800" };
      case "indirect":
        return { label: "Indirect", colorClass: "bg-yellow-100 text-yellow-800" };
      case "mixed":
        return { label: "Mixed", colorClass: "bg-purple-100 text-purple-800" };
      default:
        return { label: "Unknown", colorClass: "bg-gray-100 text-gray-800" };
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const assignments = Array.isArray(value) ? value : [];

  if (assignments.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-500">No role assignments available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {assignments.map((user) => {
        const displayName = user.name && user.name.trim() !== "" ? user.name : user.login;
        const { label: assignmentLabel, colorClass: assignmentColors } = formatAssignmentType(
          user.assignment
        );
        const teams = Array.isArray(user.inherited_from) ? user.inherited_from : [];

        return (
          <div
            key={user.id}
            className="flex items-start p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <img
              src={user.avatar_url}
              alt={`Avatar of ${displayName}`}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
            />
            <div className="ml-4 flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">{displayName}</h2>
              <p className="text-sm text-gray-500 truncate">@{user.login}</p>
              {user.email && (
                <p className="mt-1 text-sm text-gray-500 truncate" title={user.email}>
                  {user.email}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${assignmentColors}`}
                >
                  {assignmentLabel}
                </span>
                {user.site_admin && (
                  <span className="px-2 py-1 text-xs font-medium text-white bg-red-600 rounded">
                    Admin
                  </span>
                )}
              </div>
              {teams.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1">
                  {teams.slice(0, 3).map((team) => (
                    <span
                      key={team.id}
                      className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded truncate"
                      title={team.name}
                    >
                      {team.name}
                    </span>
                  ))}
                  {teams.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">
                      +{teams.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

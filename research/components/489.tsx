import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // Helper to generate avatar placeholder based on user name
  const getPlaceholder = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

  // Empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-4 text-lg">No role assignments available.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const placeholder = getPlaceholder(displayName);

        // Map assignment types to icon, label, and color
        const assignmentMap: Record<
          "direct" | "indirect" | "mixed",
          { icon: React.ReactNode; label: string; color: string }
        > = {
          direct: {
            icon: <LucideReact.CheckCircle size={16} />,
            label: "Direct",
            color: "text-green-500",
          },
          indirect: {
            icon: <LucideReact.Users size={16} />,
            label: "Indirect",
            color: "text-blue-500",
          },
          mixed: {
            icon: <LucideReact.GitBranch size={16} />,
            label: "Mixed",
            color: "text-purple-500",
          },
        };
        const key = (user.assignment ?? "direct") as keyof typeof assignmentMap;
        const assignmentInfo = assignmentMap[key];

        return (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-start">
              {/* Avatar */}
              <div className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={user.avatar_url}
                  alt={displayName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholder;
                  }}
                />
              </div>
              <div className="ml-4 flex-1">
                {/* Name and Assignment */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {displayName}
                  </h3>
                  <div className={`flex items-center ${assignmentInfo.color}`}>
                    {assignmentInfo.icon}
                    <span className="ml-1 text-sm">{assignmentInfo.label}</span>
                  </div>
                </div>
                {/* Username */}
                <p className="text-sm text-gray-500 truncate">@{user.login}</p>
                {/* Email */}
                {user.email && (
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <LucideReact.Mail size={14} className="mr-1" />
                    <span className="truncate">{user.email}</span>
                  </div>
                )}
                {/* Inherited Teams */}
                {user.inherited_from && user.inherited_from.length > 0 && (
                  <div className="mt-3">
                    <span className="text-xs font-medium text-gray-600">
                      Inherited via:
                    </span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {user.inherited_from.map((team) => (
                        <span
                          key={team.id}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full truncate"
                        >
                          {team.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

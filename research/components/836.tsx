import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Pull Request Review Request
   *
   * @title Pull Request Review Request
   */
  export type pull_request_review_request = {
    users: AutoViewInputSubTypes.simple_user[];
    teams: AutoViewInputSubTypes.team[];
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
   * @title Team
   */
  export type team = {
    id: number & tags.Type<"int32">;
    node_id: string;
    name: string;
    slug: string;
    description: string | null;
    privacy?: string;
    notification_setting?: string;
    permission: string;
    permissions?: {
      pull: boolean;
      triage: boolean;
      push: boolean;
      maintain: boolean;
      admin: boolean;
    };
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    members_url: string;
    repositories_url: string & tags.Format<"uri">;
    parent: AutoViewInputSubTypes.nullable_team_simple;
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
}
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review_request;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const { users, teams } = value;

  const hasUsers = Array.isArray(users) && users.length > 0;
  const hasTeams = Array.isArray(teams) && teams.length > 0;

  // Render fallback when no reviewers requested
  if (!hasUsers && !hasTeams) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <LucideReact.AlertCircle className="text-gray-400" size={48} />
        <p className="mt-4 text-gray-500 text-sm">No review requests</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Users Section */}
      {hasUsers && (
        <div>
          <div className="flex items-center gap-2 text-gray-700">
            <LucideReact.User className="text-indigo-500" size={20} />
            <h3 className="text-sm font-semibold">Requested Users</h3>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {users.map((user) => {
              const login = user.login;
              const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                login,
              )}&background=random`;
              return (
                <div
                  key={user.id}
                  className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md"
                >
                  <img
                    src={user.avatar_url}
                    alt={login}
                    className="w-6 h-6 rounded-full object-cover bg-gray-200"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallback;
                    }}
                  />
                  <span className="text-xs text-gray-800 truncate max-w-[80px]">
                    {login}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Teams Section */}
      {hasTeams && (
        <div>
          <div className="flex items-center gap-2 text-gray-700">
            <LucideReact.Users className="text-green-500" size={20} />
            <h3 className="text-sm font-semibold">Requested Teams</h3>
          </div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teams.map((team) => (
              <div
                key={team.id}
                className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md"
              >
                <LucideReact.Users
                  size={16}
                  className="text-gray-500 flex-shrink-0"
                />
                <div className="flex flex-col truncate">
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {team.name}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {team.slug}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

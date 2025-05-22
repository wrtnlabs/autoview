import { tags } from "typia";
import React from "react";
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
}
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review_request;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { users, teams } = value;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // Derive display name for users
  const userItems = users.map((user) => {
    const displayName = user.name?.trim() ? user.name! : user.login;
    return { 
      key: user.id, 
      avatar: user.avatar_url, 
      displayName, 
      login: user.login 
    };
  });

  // Derive display properties for teams
  const teamItems = teams.map((team) => {
    const description = team.description ?? "No description provided.";
    const permission = capitalize(team.permission);
    return {
      key: team.id,
      name: team.name,
      slug: team.slug,
      description,
      permission,
    };
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Review Requests</h2>

      {userItems.length > 0 && (
        <section className="mb-6">
          <h3 className="text-md font-medium text-gray-700 mb-2">Users</h3>
          <ul className="flex flex-wrap gap-4">
            {userItems.map((u) => (
              <li key={u.key} className="flex items-center space-x-3">
                <img
                  src={u.avatar}
                  alt={u.displayName}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {u.displayName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">@{u.login}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {teamItems.length > 0 && (
        <section>
          <h3 className="text-md font-medium text-gray-700 mb-2">Teams</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teamItems.map((t) => (
              <div
                key={t.key}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {t.slug}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    {t.permission}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {userItems.length === 0 && teamItems.length === 0 && (
        <p className="text-gray-500">No review requests.</p>
      )}
    </div>
  );
}

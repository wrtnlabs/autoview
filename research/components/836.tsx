import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Pull Request Review Request
     *
     * @title Pull Request Review Request
    */
    export interface pull_request_review_request {
        users: AutoViewInputSubTypes.simple_user[];
        teams: AutoViewInputSubTypes.team[];
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team
    */
    export interface team {
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
}
export type AutoViewInput = AutoViewInputSubTypes.pull_request_review_request;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const users: AutoViewInputSubTypes.simple_user[] = value.users ?? [];
  const teams: AutoViewInputSubTypes.team[] = value.teams ?? [];
  const hasUsers = users.length > 0;
  const hasTeams = teams.length > 0;

  const getAvatarUrl = (user: AutoViewInputSubTypes.simple_user): string => {
    if (user.avatar_url) return user.avatar_url;
    const name = encodeURIComponent(user.name ?? user.login);
    return `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {!(hasUsers || hasTeams) ? (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2 text-sm">No review requests</p>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <LucideReact.Users size={20} className="text-gray-600" />
            Review Requests
          </h2>

          {hasUsers && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <LucideReact.User size={16} className="text-gray-500" />
                Individual Reviewers
              </h3>
              <ul className="space-y-2">
                {users.map((user) => {
                  const displayName = user.name?.trim() ? user.name! : user.login;
                  return (
                    <li key={user.id}>
                      <div className="flex items-center space-x-3">
                        <img
                          src={getAvatarUrl(user)}
                          alt={displayName}
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              displayName,
                            )}&background=0D8ABC&color=fff`;
                          }}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {displayName}
                          </span>
                          <span className="text-xs text-gray-500">
                            @{user.login}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {hasTeams && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <LucideReact.Users size={16} className="text-gray-500" />
                Team Reviewers
              </h3>
              <ul className="space-y-2">
                {teams.map((team) => (
                  <li key={team.id}>
                    <div className="flex items-start space-x-3">
                      <LucideReact.Users size={32} className="text-gray-500 mt-1" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {team.name}
                        </span>
                        <span className="text-xs text-gray-500">{team.slug}</span>
                        {team.description && (
                          <span className="text-xs text-gray-500 italic line-clamp-2">
                            {team.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

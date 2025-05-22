import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Branch Restriction Policy
     *
     * @title Branch Restriction Policy
    */
    export type branch_restriction_policy = {
        url: string & tags.Format<"uri">;
        users_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        apps_url: string & tags.Format<"uri">;
        users: {
            login?: string;
            id?: number & tags.Type<"int32">;
            node_id?: string;
            avatar_url?: string;
            gravatar_id?: string;
            url?: string;
            html_url?: string;
            followers_url?: string;
            following_url?: string;
            gists_url?: string;
            starred_url?: string;
            subscriptions_url?: string;
            organizations_url?: string;
            repos_url?: string;
            events_url?: string;
            received_events_url?: string;
            type?: string;
            site_admin?: boolean;
            user_view_type?: string;
        }[];
        teams: {
            id?: number & tags.Type<"int32">;
            node_id?: string;
            url?: string;
            html_url?: string;
            name?: string;
            slug?: string;
            description?: string | null;
            privacy?: string;
            notification_setting?: string;
            permission?: string;
            members_url?: string;
            repositories_url?: string;
            parent?: string | null;
        }[];
        apps: {
            id?: number & tags.Type<"int32">;
            slug?: string;
            node_id?: string;
            owner?: {
                login?: string;
                id?: number & tags.Type<"int32">;
                node_id?: string;
                url?: string;
                repos_url?: string;
                events_url?: string;
                hooks_url?: string;
                issues_url?: string;
                members_url?: string;
                public_members_url?: string;
                avatar_url?: string;
                description?: string;
                gravatar_id?: string;
                html_url?: string;
                followers_url?: string;
                following_url?: string;
                gists_url?: string;
                starred_url?: string;
                subscriptions_url?: string;
                organizations_url?: string;
                received_events_url?: string;
                type?: string;
                site_admin?: boolean;
                user_view_type?: string;
            };
            name?: string;
            client_id?: string;
            description?: string;
            external_url?: string;
            html_url?: string;
            created_at?: string;
            updated_at?: string;
            permissions?: {
                metadata?: string;
                contents?: string;
                issues?: string;
                single_file?: string;
            };
            events?: string[];
        }[];
    };
}
export type AutoViewInput = AutoViewInputSubTypes.branch_restriction_policy;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const userCount = value.users.length;
  const teamCount = value.teams.length;
  const appCount = value.apps.length;

  // Limit avatars and badges for brevity on small screens
  const displayedUsers = value.users.filter(u => u.avatar_url && u.login).slice(0, 5);
  const displayedTeams = value.teams.filter(t => t.name).slice(0, 5);
  const displayedApps = value.apps.filter(a => a.name).slice(0, 5);

  // Date formatter
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-800">
          Branch Restriction Policy
        </h2>
        <div className="text-xs text-gray-500 truncate" title={value.url}>
          Policy URL: {value.url}
        </div>
      </div>

      {/* Counts Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-2xl">👤</span>
          <div className="ml-3">
            <div className="text-xl font-semibold text-gray-800">
              {userCount}
            </div>
            <div className="text-sm text-gray-600">Users</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-2xl">👥</span>
          <div className="ml-3">
            <div className="text-xl font-semibold text-gray-800">
              {teamCount}
            </div>
            <div className="text-sm text-gray-600">Teams</div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-2xl">📦</span>
          <div className="ml-3">
            <div className="text-xl font-semibold text-gray-800">
              {appCount}
            </div>
            <div className="text-sm text-gray-600">Apps</div>
          </div>
        </div>
      </div>

      {/* Detailed Lists */}
      <div className="space-y-4">
        {/* Users Avatars */}
        {userCount > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              User Avatars
            </h3>
            <div className="flex -space-x-2">
              {displayedUsers.map((user, i) => (
                <div
                  key={`user-${i}`}
                  className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                  title={user.login}
                >
                  <img
                    src={user.avatar_url!}
                    alt={user.login}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {userCount > displayedUsers.length && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border-2 border-white">
                  +{userCount - displayedUsers.length}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Teams List */}
        {teamCount > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Teams</h3>
            <div className="flex flex-wrap gap-2">
              {displayedTeams.map((team, i) => (
                <span
                  key={`team-${i}`}
                  className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs truncate"
                  title={team.name}
                >
                  {team.name}
                </span>
              ))}
              {teamCount > displayedTeams.length && (
                <span className="text-xs text-gray-500">
                  +{teamCount - displayedTeams.length} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Apps List */}
        {appCount > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Apps</h3>
            <div className="flex flex-wrap gap-2">
              {displayedApps.map((app, i) => (
                <div
                  key={`app-${i}`}
                  className="bg-blue-50 border border-blue-100 p-2 rounded-lg text-xs max-w-xs"
                >
                  <div className="font-medium text-blue-800 truncate" title={app.name}>
                    {app.name}
                  </div>
                  {app.created_at && (
                    <div className="text-gray-500">
                      Created: {formatDate(app.created_at)}
                    </div>
                  )}
                </div>
              ))}
              {appCount > displayedApps.length && (
                <div className="text-xs text-gray-500 flex items-center">
                  +{appCount - displayedApps.length} more
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Branch Restriction Policy
     *
     * @title Branch Restriction Policy
    */
    export interface branch_restriction_policy {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.branch_restriction_policy;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const userCount = value.users?.length ?? 0;
  const teamCount = value.teams?.length ?? 0;
  const appCount = value.apps?.length ?? 0;

  const userPreview = (value.users ?? []).slice(0, 3);
  const teamPreview = (value.teams ?? []).slice(0, 3);
  const appPreview = (value.apps ?? []).slice(0, 3);

  const userAvatarPlaceholder = (login: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <LucideReact.Lock size={20} className="mr-2 text-gray-500" />
        Branch Restriction Policy
      </h2>

      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <LucideReact.Users size={16} className="mr-1 text-gray-400" />
          <span>{userCount} {userCount === 1 ? 'User' : 'Users'}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.UserCheck size={16} className="mr-1 text-gray-400" />
          <span>{teamCount} {teamCount === 1 ? 'Team' : 'Teams'}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Box size={16} className="mr-1 text-gray-400" />
          <span>{appCount} {appCount === 1 ? 'App' : 'Apps'}</span>
        </div>
      </div>

      {userCount > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Allowed Users</h3>
          <ul className="flex items-center -space-x-2">
            {userPreview.map((user, idx) => {
              const login = user.login ?? 'User';
              const src = user.avatar_url ?? userAvatarPlaceholder(login);
              return (
                <li key={idx}>
                  <img
                    src={src}
                    alt={login}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = userAvatarPlaceholder(login);
                    }}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                </li>
              );
            })}
            {userCount > userPreview.length && (
              <li className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white">
                +{userCount - userPreview.length}
              </li>
            )}
          </ul>
        </div>
      )}

      {teamCount > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Allowed Teams</h3>
          <ul className="space-y-1">
            {teamPreview.map((team, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-600">
                <LucideReact.Users size={16} className="mr-2 text-gray-400" />
                <span className="font-medium text-gray-800">{team.name ?? team.slug ?? 'Team'}</span>
                {team.slug && (
                  <span className="ml-1 truncate text-gray-500 text-xs">({team.slug})</span>
                )}
              </li>
            ))}
            {teamCount > teamPreview.length && (
              <li className="text-xs text-gray-500">+{teamCount - teamPreview.length} more</li>
            )}
          </ul>
        </div>
      )}

      {appCount > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Allowed Apps</h3>
          <ul className="space-y-1">
            {appPreview.map((app, idx) => {
              const created = app.created_at
                ? new Date(app.created_at).toLocaleDateString()
                : null;
              return (
                <li key={idx} className="flex items-center text-sm text-gray-600">
                  <LucideReact.Box size={16} className="mr-2 text-gray-400" />
                  <span className="font-medium text-gray-800 truncate">{app.name ?? app.slug ?? 'App'}</span>
                  {created && (
                    <span className="ml-auto text-xs text-gray-500">{created}</span>
                  )}
                </li>
              );
            })}
            {appCount > appPreview.length && (
              <li className="text-xs text-gray-500">+{appCount - appPreview.length} more</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

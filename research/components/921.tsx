import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A team's access to a project.
     *
     * @title Team Project
    */
    export interface team_project {
        owner_url: string;
        url: string;
        html_url: string;
        columns_url: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        body: string | null;
        number: number & tags.Type<"int32">;
        state: string;
        creator: AutoViewInputSubTypes.simple_user;
        created_at: string;
        updated_at: string;
        /**
         * The organization permission for this project. Only present when owner is an organization.
        */
        organization_permission?: string;
        /**
         * Whether the project is private or not. Only present when owner is an organization.
        */
        "private"?: boolean;
        permissions: {
            read: boolean;
            write: boolean;
            admin: boolean;
        };
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
}
export type AutoViewInput = AutoViewInputSubTypes.team_project[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const getStateColor = (state: string) => {
    switch (state.toLowerCase()) {
      case 'open':
        return 'text-green-600';
      case 'closed':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No projects available</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {value.map((project) => {
        const {
          id,
          name,
          body,
          number,
          state,
          creator,
          created_at,
          updated_at,
          permissions,
        } = project;

        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          creator.name ?? creator.login
        )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={id}
            className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-shrink-0">
              <img
                src={creator.avatar_url}
                alt={`${creator.login} avatar`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = avatarFallback;
                }}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="flex-grow flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {name}
                </h2>
                <span className={`flex items-center gap-1 ${getStateColor(state)}`}>
                  <LucideReact.CircleDot size={12} />
                  <span className="capitalize text-sm font-medium">{state}</span>
                </span>
              </div>
              <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                {body ?? <span className="italic text-gray-400">No description</span>}
              </p>
              <div className="mt-3 flex flex-wrap items-center text-gray-500 text-sm gap-4">
                <div className="flex items-center gap-1">
                  <LucideReact.Hash size={16} />
                  <span>#{number}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} />
                  <span>Created {formatDate(created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.RefreshCw size={16} />
                  <span>Updated {formatDate(updated_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.User size={16} />
                  <span>{creator.login}</span>
                </div>
                <div className="flex items-center gap-2">
                  {permissions.read ? (
                    <LucideReact.Eye
                      size={16}
                      className="text-green-500"
                      role="img"
                      aria-label="Read access"
                    />
                  ) : (
                    <LucideReact.EyeOff
                      size={16}
                      className="text-gray-300"
                      role="img"
                      aria-label="No read access"
                    />
                  )}
                  {permissions.write ? (
                    <LucideReact.Edit3
                      size={16}
                      className="text-blue-500"
                      role="img"
                      aria-label="Write access"
                    />
                  ) : (
                    <LucideReact.Edit3
                      size={16}
                      className="text-gray-300"
                      role="img"
                      aria-label="No write access"
                    />
                  )}
                  {permissions.admin ? (
                    <LucideReact.Shield
                      size={16}
                      className="text-red-500"
                      role="img"
                      aria-label="Admin access"
                    />
                  ) : (
                    <LucideReact.Shield
                      size={16}
                      className="text-gray-300"
                      role="img"
                      aria-label="No admin access"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

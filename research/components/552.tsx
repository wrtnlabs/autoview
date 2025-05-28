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
export type AutoViewInput = AutoViewInputSubTypes.team_project;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const formattedCreated = new Date(value.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formattedUpdated = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const isPrivate = value["private"] ?? false;
  const activePermissions = Object.entries(value.permissions)
    .filter(([, enabled]) => enabled)
    .map(([perm]) => perm);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
        {isPrivate ? (
          <LucideReact.Lock
            className="text-gray-500"
            size={20}
            aria-label="Private project"
          />
        ) : (
          <LucideReact.Unlock
            className="text-gray-500"
            size={20}
            aria-label="Public project"
          />
        )}
      </div>

      <div className="text-sm text-gray-500 mt-1">
        <span className="font-medium">#{value.number}</span>
        <span className="mx-2">&bull;</span>
        <span className="capitalize">{value.state}</span>
      </div>

      {value.organization_permission && (
        <div className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
          {value.organization_permission}
        </div>
      )}

      {value.body && (
        <p className="text-gray-700 mt-3 text-sm line-clamp-3 break-words">
          {value.body}
        </p>
      )}

      <div className="flex items-center mt-4 space-x-4">
        <img
          src={value.creator.avatar_url}
          alt={value.creator.login}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              value.creator.login,
            )}&background=0D8ABC&color=fff`;
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">
            {value.creator.name ?? value.creator.login}
          </div>
          <div className="text-xs text-gray-500">
            Created: {formattedCreated}
          </div>
          <div className="text-xs text-gray-500">
            Updated: {formattedUpdated}
          </div>
        </div>
      </div>

      {activePermissions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {activePermissions.includes('read') && (
            <div className="flex items-center text-gray-600 text-sm">
              <LucideReact.Eye size={16} className="mr-1" />
              Read
            </div>
          )}
          {activePermissions.includes('write') && (
            <div className="flex items-center text-gray-600 text-sm">
              <LucideReact.Edit size={16} className="mr-1" />
              Write
            </div>
          )}
          {activePermissions.includes('admin') && (
            <div className="flex items-center text-gray-600 text-sm">
              <LucideReact.ShieldCheck size={16} className="mr-1" />
              Admin
            </div>
          )}
        </div>
      )}
    </div>
  );
}

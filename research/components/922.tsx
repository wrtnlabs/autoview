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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isPrivate = value["private"] ?? false;
  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);
  const stateClasses =
    value.state === "open"
      ? "text-green-700 bg-green-100"
      : value.state === "closed"
      ? "text-red-700 bg-red-100"
      : "text-gray-700 bg-gray-100";
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const permList = Object.entries(value.permissions)
    .filter(([_k, v]) => v)
    .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 overflow-hidden">
          <LucideReact.Folder className="text-gray-500 flex-shrink-0" size={20} />
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.name}
          </h2>
          <span className="text-sm text-gray-500 flex-shrink-0">#{value.number}</span>
        </div>
        {isPrivate ? (
          <LucideReact.Lock
            className="text-gray-500"
            size={18}
            aria-label="Private"
          />
        ) : (
          <LucideReact.Unlock
            className="text-gray-500"
            size={18}
            aria-label="Public"
          />
        )}
      </div>

      {/* Description */}
      {value.body && (
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">{value.body}</p>
      )}

      {/* State Badge */}
      <div className="mt-3">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${stateClasses}`}
        >
          {stateLabel}
        </span>
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex flex-col space-y-2 text-gray-500 text-sm">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Clock size={16} />
          <span>Updated: {updatedDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src={value.creator.avatar_url}
            alt={value.creator.login}
            className="h-6 w-6 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                value.creator.login
              )}&background=ddd&color=555`;
            }}
          />
          <span className="truncate">{value.creator.login}</span>
        </div>
        {permList.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {permList.map((perm) => (
              <span
                key={perm}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {perm}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

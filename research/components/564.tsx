import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Projects are a way to organize columns and cards of work.
     *
     * @title Project
    */
    export interface project {
        owner_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        columns_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * Name of the project
        */
        name: string;
        /**
         * Body of the project
        */
        body: string | null;
        number: number & tags.Type<"int32">;
        /**
         * State of the project; either 'open' or 'closed'
        */
        state: string;
        creator: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The baseline permission that all organization members have on this project. Only present if owner is an organization.
        */
        organization_permission?: "read" | "write" | "admin" | "none";
        /**
         * Whether or not this project can be seen by everyone. Only present if owner is an organization.
        */
        "private"?: boolean;
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
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
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.project;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const description = value.body ?? '';
  const truncatedDescription =
    description.length > 200 ? description.slice(0, 200) + '…' : description;
  const creatorName = value.creator
    ? value.creator.name ?? value.creator.login
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {value["private"] && (
            <LucideReact.Lock size={20} className="text-gray-500" />
          )}
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {value.name}
          </h2>
          <span className="text-sm text-gray-500">#{value.number}</span>
        </div>
        {value.organization_permission && (
          <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded">
            {value.organization_permission.charAt(0).toUpperCase() +
              value.organization_permission.slice(1)}
          </span>
        )}
      </div>

      {truncatedDescription && (
        <p className="text-gray-700 text-sm line-clamp-2">{truncatedDescription}</p>
      )}

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          {value.state === 'open' ? (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
              aria-label="Open"
            />
          ) : (
            <LucideReact.XCircle
              size={16}
              className="text-red-500"
              aria-label="Closed"
            />
          )}
          <span className="capitalize">{value.state}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created {createdDate}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Updated {updatedDate}</span>
        </div>
      </div>

      {value.creator && (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
            <img
              src={value.creator.avatar_url}
              alt={creatorName ?? 'Creator avatar'}
              className="w-full h-full object-cover"
              onError={(e) =>
                (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  creatorName || ''
                )}&background=ddd&color=444`)
              }
            />
          </div>
          <div className="flex items-center space-x-1 text-gray-700 text-sm">
            <LucideReact.User size={16} className="text-gray-400" />
            <span className="truncate">{creatorName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

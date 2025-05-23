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
export type AutoViewInput = AutoViewInputSubTypes.project[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Format ISO dates into a human-readable form.
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {value.map((proj) => {
        const login = proj.creator?.login ?? 'Unknown';
        const avatarUrl = proj.creator?.avatar_url;
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          login,
        )}&background=random`;

        return (
          <div key={proj.id} className="bg-white p-4 rounded-lg shadow">
            {/* Header: Project Name & State */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {proj.name}
              </h3>
              {proj.state === 'open' ? (
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
            </div>

            {/* Creator Info */}
            <div className="flex items-center mb-2">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={login}
                  onError={(e) => {
                    e.currentTarget.src = avatarFallback;
                  }}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <LucideReact.User
                  size={24}
                  className="text-gray-400"
                  aria-label="User"
                />
              )}
              <span className="ml-2 text-sm font-medium text-gray-800">
                {login}
              </span>
            </div>

            {/* Description */}
            <p className="mb-2 text-sm text-gray-600 line-clamp-2">
              {proj.body ?? 'No description'}
            </p>

            {/* Timestamps */}
            <div className="flex items-center text-xs text-gray-500 space-x-4">
              <div className="flex items-center">
                <LucideReact.Calendar size={14} />
                <span className="ml-1">
                  Created {formatDate(proj.created_at)}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.Clock size={14} />
                <span className="ml-1">
                  Updated {formatDate(proj.updated_at)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

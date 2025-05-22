import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Projects are a way to organize columns and cards of work.
   *
   * @title Project
   */
  export type project = {
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
    private?: boolean;
  };
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
  const formatDate = (dateStr: string): string => {
    try {
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((project) => {
        const { id, name, state, body, creator, created_at, updated_at } =
          project;
        const creatorName = creator?.login ?? "Unknown";
        const avatarUrl =
          creator?.avatar_url ??
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            creatorName,
          )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="flex items-center justify-between mb-2">
              <h2
                className="text-lg font-semibold text-gray-800 truncate"
                title={name}
              >
                {name}
              </h2>
              <span
                className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                  state === "open"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {state === "open" ? (
                  <>
                    <LucideReact.CheckCircle
                      className="mr-1"
                      size={12}
                      aria-label="Open"
                    />
                    <span>Open</span>
                  </>
                ) : (
                  <>
                    <LucideReact.XCircle
                      className="mr-1"
                      size={12}
                      aria-label="Closed"
                    />
                    <span>Closed</span>
                  </>
                )}
              </span>
            </div>

            {body && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{body}</p>
            )}

            <div className="flex items-center mb-4">
              <img
                src={avatarUrl}
                alt={creatorName}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      creatorName,
                    )}&background=0D8ABC&color=fff`;
                }}
                className="w-6 h-6 rounded-full object-cover mr-2"
              />
              <span className="text-sm text-gray-700">{creatorName}</span>
            </div>

            <div className="mt-auto flex flex-col space-y-1 text-xs text-gray-500">
              <div className="flex items-center">
                <LucideReact.Calendar className="mr-1" size={14} />
                <span>Created: {formatDate(created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar className="mr-1" size={14} />
                <span>Updated: {formatDate(updated_at)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

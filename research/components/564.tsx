import LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.project;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const isPrivate = value["private"] ?? false;
  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);
  const stateIcon =
    value.state === "open" ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : (
      <LucideReact.XCircle className="text-red-500" size={16} />
    );
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
  const creator = value.creator;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Name, Number, State & Privacy */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.name}
          </h2>
          <span className="text-sm text-gray-500">#{value.number}</span>
        </div>
        <div className="flex items-center space-x-2">
          {stateIcon}
          <span className="text-sm text-gray-600">{stateLabel}</span>
          {isPrivate ? (
            <LucideReact.Lock className="text-gray-600" size={16} />
          ) : (
            <LucideReact.Unlock className="text-gray-600" size={16} />
          )}
        </div>
      </div>

      {/* Project Link */}
      <div className="mt-3 flex items-center space-x-1 text-sm text-blue-600">
        <LucideReact.Link size={16} />
        <a
          href={value.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate hover:underline"
          title={value.html_url}
        >
          {value.html_url}
        </a>
      </div>

      {/* Description / Body */}
      {value.body && (
        <p className="mt-3 text-gray-700 text-sm line-clamp-3">{value.body}</p>
      )}

      {/* Dates */}
      <div className="mt-4 flex flex-col space-y-2 text-gray-500 text-sm">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Created {createdDate}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Clock size={16} />
          <span>Updated {updatedDate}</span>
        </div>
      </div>

      {/* Creator Info */}
      {creator && (
        <div className="mt-4 flex items-center">
          <img
            src={creator.avatar_url}
            alt={creator.login}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent((creator.name ?? creator.login) as string)}&background=0D8ABC&color=fff`;
            }}
          />
          <div className="ml-3 text-sm">
            <p className="text-gray-800 font-medium">
              {creator.name ?? creator.login}
            </p>
            <p className="text-gray-500">
              <a
                href={creator.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @{creator.login}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

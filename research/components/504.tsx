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
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const createdDate = formatDate(value.created_at);
  const updatedDate = formatDate(value.updated_at);

  const isOpen = value.state === "open";
  const stateLabel = isOpen ? "Open" : "Closed";
  const StateIcon = isOpen
    ? LucideReact.CheckCircle
    : LucideReact.XCircle;
  const stateColor = isOpen ? "text-green-500" : "text-red-500";

  const isPrivate = value["private"] === true;

  const creator = value.creator;
  const creatorName = creator
    ? creator.name?.trim() || creator.login
    : "Unknown";
  const avatarSrc = creator?.avatar_url;
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    creatorName,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-md w-full mx-auto">
      {/* Header: Project Name & Status */}
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-lg font-semibold text-gray-900 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
        <div className="flex items-center space-x-2">
          <StateIcon className={`w-5 h-5 ${stateColor}`} />
          <span className={`text-sm font-medium ${stateColor}`}>
            {stateLabel}
          </span>
          {isPrivate && (
            <LucideReact.Lock
              className="w-5 h-5 text-gray-500"
              aria-label="Private"
            />
          )}
        </div>
      </div>

      {/* Body / Description */}
      {value.body && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {value.body}
        </p>
      )}

      {/* Creator & Dates */}
      <div className="flex flex-wrap items-center mb-4 gap-x-4 gap-y-2 text-sm text-gray-500">
        {creator && (
          <div className="flex items-center space-x-2">
            <img
              src={avatarSrc || avatarFallback}
              alt={creatorName}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = avatarFallback;
              }}
            />
            <span className="text-gray-800">{creatorName}</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar className="w-4 h-4" />
          <span>Created {createdDate}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.RefreshCw className="w-4 h-4" />
          <span>Updated {updatedDate}</span>
        </div>
      </div>

      {/* Project Number */}
      <div className="flex items-center space-x-1 text-sm text-gray-500">
        <LucideReact.Hash className="w-4 h-4" />
        <span>#{value.number}</span>
      </div>
    </div>
  );
}

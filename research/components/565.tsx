import { tags } from "typia";
import React from "react";
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
        "private"?: boolean;
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusLabel = value.state === "open" ? "Open" : "Closed";
  const statusColor =
    value.state === "open"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  const isPrivate = value["private"] === true;
  const permissionLabel = value.organization_permission
    ? `${value.organization_permission.charAt(0).toUpperCase()}${value.organization_permission.slice(1)}`
    : "";

  const createdDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(value.created_at));

  const updatedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(value.updated_at));

  const creatorName = value.creator
    ? value.creator.name || value.creator.login
    : "Unknown";
  const creatorAvatar = value.creator?.avatar_url || "";

  const bodyPreview = value.body
    ? value.body.length > 200
      ? value.body.slice(0, 200).trim() + "…"
      : value.body
    : "No description provided.";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-start">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {value.name}
          </h2>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className={`px-2 py-1 rounded ${statusColor}`}>
              {statusLabel}
            </span>
            {isPrivate && (
              <span className="px-2 py-1 rounded bg-gray-200 text-gray-800">
                Private
              </span>
            )}
            {permissionLabel && (
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                {permissionLabel}
              </span>
            )}
          </div>
        </div>
        {creatorAvatar && (
          <img
            src={creatorAvatar}
            alt={`${creatorName} avatar`}
            className="w-10 h-10 rounded-full ml-4 flex-shrink-0"
          />
        )}
      </div>

      <p className="mt-4 text-sm text-gray-600 line-clamp-3">
        {bodyPreview}
      </p>

      <div className="mt-4 text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
        <span className="whitespace-nowrap">#{value.number}</span>
        <span className="whitespace-nowrap">Created: {createdDate}</span>
        <span className="whitespace-nowrap">Updated: {updatedDate}</span>
        <span className="whitespace-nowrap">By: {creatorName}</span>
      </div>
    </div>
  );
}

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
  const formattedCreatedAt: string = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedUpdatedAt: string = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const stateBadgeClasses: string =
    value.state === "open"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  const privacyBadgeClasses: string =
    value.private === true
      ? "bg-gray-700 text-white"
      : "bg-blue-100 text-blue-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium uppercase rounded ${stateBadgeClasses}`}
        >
          {value.state}
        </span>
      </div>

      <p className="mt-2 text-gray-600 text-sm line-clamp-2">
        {value.body ?? "No description provided."}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <span>#{value.number}</span>
        {value.organization_permission && (
          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
            {value.organization_permission.charAt(0).toUpperCase() +
              value.organization_permission.slice(1)} Permission
          </span>
        )}
        {value.private !== undefined && (
          <span
            className={`px-2 py-0.5 text-xs font-medium uppercase rounded ${privacyBadgeClasses}`}
          >
            {value.private ? "Private" : "Public"}
          </span>
        )}
      </div>

      {value.creator && (
        <div className="mt-4 flex items-center">
          <img
            src={value.creator.avatar_url}
            alt={`${value.creator.login} avatar`}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <span className="ml-2 text-gray-700 text-sm font-medium truncate">
            {value.creator.name ?? value.creator.login}
          </span>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <div>Created: {formattedCreatedAt}</div>
        <div>Updated: {formattedUpdatedAt}</div>
      </div>
    </div>
  );
}

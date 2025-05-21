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
  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);
  const stateBadgeClasses =
    value.state === 'open'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Project Name and Number */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
        <span className="text-sm text-gray-500 mt-1 sm:mt-0">#{value.number}</span>
      </div>

      {/* Dates */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1 space-x-2">
        <span>Created: {createdDate}</span>
        <span>•</span>
        <span>Updated: {updatedDate}</span>
      </div>

      {/* Description */}
      {value.body ? (
        <p className="text-gray-700 text-sm mt-3 line-clamp-3">
          {value.body}
        </p>
      ) : null}

      {/* Badges: State, Org Permission, Privacy */}
      <div className="flex flex-wrap items-center space-x-2 mt-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${stateBadgeClasses}`}
        >
          {stateLabel}
        </span>
        {value.organization_permission ? (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
            {value.organization_permission}
          </span>
        ) : null}
        {value.private ? (
          <span
            className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            title="Private project"
          >
            🔒 Private
          </span>
        ) : null}
      </div>

      {/* Creator */}
      {value.creator ? (
        <div className="flex items-center mt-4">
          <img
            src={value.creator.avatar_url}
            alt={value.creator.login}
            className="w-6 h-6 rounded-full flex-shrink-0"
          />
          <span className="ml-2 text-gray-800 text-sm truncate">
            {value.creator.login}
          </span>
        </div>
      ) : null}
    </div>
  );
}

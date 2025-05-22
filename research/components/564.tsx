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
  const stateLabel =
    value.state === "open" ? "Open" :
    value.state === "closed" ? "Closed" :
    value.state.charAt(0).toUpperCase() + value.state.slice(1);

  const privacyLabel = value.private ? "Private" : "Public";

  const permissionLabel = value.organization_permission
    ? value.organization_permission.charAt(0).toUpperCase() + value.organization_permission.slice(1)
    : null;

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

  const description = value.body ?? "No description provided.";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Header: Name and badges */}
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <div className="flex items-center space-x-2">
          <span
            className={
              "px-2 py-0.5 text-xs font-medium rounded-full " +
              (value.state === "open"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800")
            }
          >
            {stateLabel}
          </span>
          {permissionLabel && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              {permissionLabel}
            </span>
          )}
        </div>
      </div>

      {/* Subheader: Number and Privacy */}
      <div className="mt-1 text-sm text-gray-500">
        #{value.number} · {privacyLabel}
      </div>

      {/* Description */}
      <p className="mt-3 text-gray-700 text-sm line-clamp-3">
        {description}
      </p>

      {/* Footer: Creator and Dates */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="flex items-center">
          {value.creator ? (
            <>
              <img
                className="w-6 h-6 rounded-full"
                src={value.creator.avatar_url}
                alt={value.creator.login}
              />
              <span className="ml-2 text-sm text-gray-700">
                {value.creator.name ?? value.creator.login}
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-700">Unknown creator</span>
          )}
        </div>
        <div className="text-xs text-gray-500 whitespace-nowrap">
          Created {createdDate}
          <span className="mx-1">·</span>
          Updated {updatedDate}
        </div>
      </div>
    </div>
  );
}

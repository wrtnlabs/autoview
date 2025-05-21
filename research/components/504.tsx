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
  const title = value.name;
  const projectNumber = `#${value.number}`;
  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);
  const stateColor =
    value.state === "open"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const updatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const creatorLogin = value.creator?.login ?? "Unknown";
  const creatorAvatar = value.creator?.avatar_url;
  const description = value.body ?? "";
  const privacyLabel = value.private ? "Private" : "Public";
  const permissionLabel = value.organization_permission
    ? value.organization_permission.charAt(0).toUpperCase() +
      value.organization_permission.slice(1)
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline">
          <h2 className="text-xl font-semibold text-gray-900 truncate">
            {title}
          </h2>
          <span className="ml-2 text-sm text-gray-500">{projectNumber}</span>
        </div>
        <span
          className={`mt-2 sm:mt-0 inline-block px-2 py-0.5 text-sm font-medium rounded-full ${stateColor}`}
        >
          {stateLabel}
        </span>
      </header>

      {description && (
        <p className="text-gray-700 mt-3 text-sm line-clamp-3">
          {description}
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <dt className="font-medium">Created</dt>
          <dd>{createdAt}</dd>
        </div>
        <div>
          <dt className="font-medium">Updated</dt>
          <dd>{updatedAt}</dd>
        </div>
        <div className="sm:col-span-2 flex items-center">
          {creatorAvatar && (
            <img
              src={creatorAvatar}
              alt={`${creatorLogin} avatar`}
              className="w-6 h-6 rounded-full mr-2"
            />
          )}
          <dt className="font-medium">Creator</dt>
          <dd className="ml-1">{creatorLogin}</dd>
        </div>
        <div>
          <dt className="font-medium">Visibility</dt>
          <dd>{privacyLabel}</dd>
        </div>
        {permissionLabel && (
          <div>
            <dt className="font-medium">Org Permission</dt>
            <dd>{permissionLabel}</dd>
          </div>
        )}
      </div>
    </article>
  );
}

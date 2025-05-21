import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A team's access to a project.
     *
     * @title Team Project
    */
    export type team_project = {
        owner_url: string;
        url: string;
        html_url: string;
        columns_url: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        body: string | null;
        number: number & tags.Type<"int32">;
        state: string;
        creator: AutoViewInputSubTypes.simple_user;
        created_at: string;
        updated_at: string;
        /**
         * The organization permission for this project. Only present when owner is an organization.
        */
        organization_permission?: string;
        /**
         * Whether the project is private or not. Only present when owner is an organization.
        */
        "private"?: boolean;
        permissions: {
            read: boolean;
            write: boolean;
            admin: boolean;
        };
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.team_project;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    name,
    number,
    state,
    body,
    created_at,
    updated_at,
    private: isPrivate,
    creator,
  } = value;

  const projectState = state.charAt(0).toUpperCase() + state.slice(1);
  const createdDate = new Date(created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate = new Date(updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const description = body?.trim() || "No description provided.";

  let stateColorClass = "bg-gray-100 text-gray-800";
  if (state === "open") stateColorClass = "bg-green-100 text-green-800";
  else if (state === "closed") stateColorClass = "bg-red-100 text-red-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      {/* Header: Name and metadata badges */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {name}
        </h2>
        <div className="flex items-center space-x-2">
          {isPrivate && <span className="text-gray-500">🔒</span>}
          <span
            className={`px-2 py-0.5 rounded text-xs font-semibold ${stateColorClass}`}
          >
            {projectState}
          </span>
          <span className="text-xs text-gray-500 truncate">#{number}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

      {/* Creator info */}
      <div className="flex items-center space-x-3">
        <img
          src={creator.avatar_url}
          alt={creator.login}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {creator.name ?? creator.login}
          </span>
          <span className="text-xs text-gray-500">@{creator.login}</span>
        </div>
      </div>

      {/* Dates */}
      <div className="flex items-center space-x-4 text-xs text-gray-500">
        <span>Created: {createdDate}</span>
        <span>Updated: {updatedDate}</span>
      </div>
    </article>
  );
}

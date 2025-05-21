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
  const projectName = value.name;
  const projectNumber = `#${value.number}`;
  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);
  const isPrivate = Boolean(value["private"]);
  const privacyLabel = isPrivate ? "Private" : "Public";
  const description = value.body?.trim() || "No description provided.";
  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const creatorName = value.creator.name?.trim() || value.creator.login;
  const { read, write, admin } = value.permissions;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Name, Number, State & Privacy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {projectName} <span className="text-sm text-gray-500">{projectNumber}</span>
        </h2>
        <div className="mt-2 sm:mt-0 flex items-center space-x-2">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded ${
              stateLabel === "Open"
                ? "bg-green-100 text-green-800"
                : stateLabel === "Closed"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {stateLabel}
          </span>
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded ${
              isPrivate ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
            }`}
          >
            {privacyLabel}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{description}</p>

      {/* Creator & Dates */}
      <div className="flex items-center text-gray-600 text-sm mb-4 space-x-3">
        <img
          src={value.creator.avatar_url}
          alt={creatorName}
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <div className="font-medium text-gray-800 truncate">{creatorName}</div>
          <div className="mt-0.5 flex flex-wrap text-xs text-gray-500">
            <span>Created: {formattedCreatedAt}</span>
            <span className="mx-1">&bull;</span>
            <span>Updated: {formattedUpdatedAt}</span>
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div>
        <h3 className="text-gray-800 text-sm font-medium mb-2">Permissions</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <span
              className={`w-2 h-2 rounded-full ${
                read ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            <span className="truncate">Read</span>
          </div>
          <div className="flex items-center space-x-1">
            <span
              className={`w-2 h-2 rounded-full ${
                write ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            <span className="truncate">Write</span>
          </div>
          <div className="flex items-center space-x-1">
            <span
              className={`w-2 h-2 rounded-full ${
                admin ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            <span className="truncate">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
export type AutoViewInput = AutoViewInputSubTypes.project[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const projects = value;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const created = formatDate(project.created_at);
        const creator = project.creator;
        const creatorName = creator
          ? creator.name ?? creator.login
          : "Unknown";

        return (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow hover:shadow-md p-4 flex flex-col"
          >
            {/* Header: Name and Number */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {project.name}
              </h2>
              <span className="text-sm text-gray-500">#{project.number}</span>
            </div>

            {/* Badges: State, Private, Permission */}
            <div className="flex items-center space-x-2 mb-3">
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  project.state === "open"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                } uppercase`}
              >
                {project.state}
              </span>
              {project.private && (
                <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded flex items-center">
                  🔒 Private
                </span>
              )}
              {project.organization_permission && (
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {project.organization_permission.charAt(0).toUpperCase() +
                    project.organization_permission.slice(1)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm flex-1 overflow-hidden line-clamp-3 mb-4">
              {project.body ?? "No description available."}
            </p>

            {/* Footer: Creator and Created Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {creator && (
                  <img
                    src={creator.avatar_url}
                    alt={creatorName}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-700">{creatorName}</span>
              </div>
              <span className="text-sm text-gray-500">{created}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

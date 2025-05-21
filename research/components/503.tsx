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
  const totalProjects = value.length;
  const openProjects = value.filter((p) => p.state === "open").length;
  const closedProjects = value.filter((p) => p.state === "closed").length;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Summary Header */}
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Projects Overview</h2>
        <div className="mt-3 sm:mt-0 flex space-x-4 text-sm text-gray-600">
          <div>Total: <span className="font-medium text-gray-900">{totalProjects}</span></div>
          <div>Open: <span className="font-medium text-green-600">{openProjects}</span></div>
          <div>Closed: <span className="font-medium text-red-600">{closedProjects}</span></div>
        </div>
      </header>

      {/* Projects Grid */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {value.map((project) => (
          <li key={project.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            {/* Title & State */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{project.name}</h3>
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  project.state === "open"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {project.state.charAt(0).toUpperCase() + project.state.slice(1)}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 line-clamp-3 mb-4">
              {project.body ?? "No description available."}
            </p>

            {/* Footer: project number, dates, creator */}
            <div className="mt-auto flex flex-col space-y-2 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>#{project.number}</span>
                <span>Created: {formatDate(project.created_at)}</span>
              </div>
              <div className="flex items-center space-x-2">
                {project.creator ? (
                  <img
                    src={project.creator.avatar_url}
                    alt={project.creator.login}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-200 rounded-full" />
                )}
                {project.creator ? (
                  <a
                    href={project.creator.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate"
                  >
                    {project.creator.login}
                  </a>
                ) : (
                  <span className="truncate">Unknown</span>
                )}
              </div>
            </div>

            {/* Optional Metadata */}
            {project.organization_permission && (
              <div className="mt-3 text-xs text-gray-700">
                <span className="font-semibold">Permission:</span>{" "}
                <span className="capitalize">{project.organization_permission}</span>
              </div>
            )}
            {project.private !== undefined && (
              <div className="mt-1 text-xs text-gray-700">
                <span className="font-semibold">Visibility:</span>{" "}
                <span>{project.private ? "Private" : "Public"}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

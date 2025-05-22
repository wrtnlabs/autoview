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
export type AutoViewInput = AutoViewInputSubTypes.team_project[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalProjects = value.length;
  const privateCount = value.filter((p) => p["private"] === true).length;
  const publicCount = totalProjects - privateCount;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Summary Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-lg font-semibold text-gray-700">Projects Summary</h2>
        <div className="mt-3 sm:mt-0 flex space-x-4 text-sm text-gray-600">
          <div>
            Total: <span className="font-medium text-gray-900">{totalProjects}</span>
          </div>
          <div>
            Public: <span className="font-medium">{publicCount}</span>
          </div>
          <div>
            Private: <span className="font-medium">{privateCount}</span>
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {value.map((project) => (
          <div
            key={project.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
          >
            {/* Title and State */}
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-800 truncate">
                {project.name}
              </h3>
              <span
                className={
                  "px-2 py-1 text-xs font-semibold rounded " +
                  (project.state === "open"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800")
                }
              >
                {project.state.charAt(0).toUpperCase() + project.state.slice(1)}
              </span>
            </div>

            {/* Description */}
            {project.body && (
              <p className="mt-2 text-gray-600 line-clamp-2">
                {project.body}
              </p>
            )}

            {/* Footer: Creator and Dates */}
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <img
                  src={project.creator.avatar_url}
                  alt={project.creator.login}
                  className="w-6 h-6 rounded-full"
                />
                <span className="truncate">{project.creator.login}</span>
              </div>
              <div className="mt-2 sm:mt-0 flex space-x-4">
                <div>Created: {formatDate(project.created_at)}</div>
                <div>Updated: {formatDate(project.updated_at)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

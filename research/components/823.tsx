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
  // 1. Data transformation & formatting functions
  const projects = value;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  
  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const isOpen = project.state === "open";
        const stateClasses = isOpen
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800";
        const creator = project.creator;
        const creatorName =
          creator?.name ?? creator?.login ?? "Unknown";
        const createdAt = formatDate(project.created_at);
        const updatedAt = formatDate(project.updated_at);

        return (
          <div
            key={project.id}
            className="flex flex-col justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <header className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {project.name}
              </h2>
              <span
                className={`px-2 py-0.5 text-sm font-medium rounded ${stateClasses}`}
              >
                {project.state.charAt(0).toUpperCase() +
                  project.state.slice(1)}
              </span>
            </header>

            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {project.body ?? "No description provided."}
            </p>

            <footer className="mt-4 space-y-2 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                {creator?.avatar_url && (
                  <img
                    src={creator.avatar_url}
                    alt={creatorName}
                    className="w-5 h-5 rounded-full"
                  />
                )}
                <span>{creatorName}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="font-medium">#{project.number}</span>
                <span>Created: {createdAt}</span>
                <span>Updated: {updatedAt}</span>
              </div>
              {(project.organization_permission ||
                typeof project.private === "boolean") && (
                <div className="flex flex-wrap gap-4">
                  {project.organization_permission && (
                    <span>
                      Permission: {project.organization_permission}
                    </span>
                  )}
                  {typeof project.private === "boolean" && (
                    <span>
                      Private: {project.private ? "Yes" : "No"}
                    </span>
                  )}
                </div>
              )}
            </footer>
          </div>
        );
      })}
    </div>
  );
}

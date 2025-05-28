import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Projects are a way to organize columns and cards of work.
     *
     * @title Project
    */
    export interface project {
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
    }
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
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2 text-sm">No projects available</span>
        </div>
      ) : (
        value.map((project) => (
          <div
            key={project.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-colors flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start md:items-center space-x-3 flex-1">
              {project.private ? (
                <LucideReact.Lock className="text-gray-500" size={20} />
              ) : (
                <LucideReact.Folder className="text-gray-500" size={20} />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {project.name}
                </h3>
                <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4 mt-1">
                  <div className="flex items-center">
                    <LucideReact.Calendar size={14} className="mr-1" />
                    <span>{formatDate(project.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Edit3 size={14} className="mr-1" />
                    <span>{formatDate(project.updated_at)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center text-sm text-gray-700">
                <LucideReact.Hash
                  className="mr-1 text-gray-500"
                  size={14}
                />
                <span>#{project.number}</span>
              </div>
              <div className="flex items-center text-sm">
                {project.state === "open" ? (
                  <LucideReact.CheckCircle
                    className="mr-1 text-green-500"
                    size={14}
                  />
                ) : (
                  <LucideReact.XCircle
                    className="mr-1 text-red-500"
                    size={14}
                  />
                )}
                <span
                  className={
                    project.state === "open"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {project.state.charAt(0).toUpperCase() +
                    project.state.slice(1)}
                </span>
              </div>
              <div className="flex items-center text-sm">
                {project.creator && project.creator.avatar_url ? (
                  <img
                    src={project.creator.avatar_url}
                    alt={project.creator.login}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        project.creator?.login || ""
                      )}&background=cccccc&color=ffffff`;
                    }}
                  />
                ) : (
                  <LucideReact.User
                    className="text-gray-500"
                    size={16}
                  />
                )}
                <span className="ml-1 text-gray-700">
                  {project.creator?.login || "Unknown"}
                </span>
              </div>
            </div>

            {project.body ? (
              <p className="mt-2 md:mt-0 md:ml-6 text-sm text-gray-600 line-clamp-2">
                {project.body}
              </p>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}

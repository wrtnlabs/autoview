import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    private?: boolean;
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
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <p className="mt-2">No projects available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((project) => (
        <div
          key={project.id}
          className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div>
            <div className="flex items-center">
              <LucideReact.Folder className="text-indigo-500" size={20} />
              <h3 className="ml-2 text-lg font-semibold text-gray-800 truncate">
                {project.name}
              </h3>
              <span className="ml-auto text-sm text-gray-500">
                #{project.number}
              </span>
            </div>

            <div className="flex items-center mt-1">
              {project.state === "open" ? (
                <>
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                  />
                  <span className="ml-1 text-sm text-green-600 capitalize">
                    Open
                  </span>
                </>
              ) : (
                <>
                  <LucideReact.XCircle className="text-red-500" size={16} />
                  <span className="ml-1 text-sm text-red-600 capitalize">
                    {project.state}
                  </span>
                </>
              )}
            </div>

            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {project.body ?? "No description provided."}
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center">
              <img
                src={project.creator.avatar_url}
                alt={project.creator.login}
                className="w-6 h-6 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    project.creator.login,
                  )}&background=0D8ABC&color=fff`;
                }}
              />
              <span className="ml-2 text-sm text-gray-700">
                {project.creator.login}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <LucideReact.Calendar size={16} />
              <span className="ml-1">{formatDate(project.created_at)}</span>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <LucideReact.Eye
                  size={16}
                  className={
                    project.permissions.read
                      ? "text-green-500"
                      : "text-gray-300"
                  }
                />
                <span
                  className={`ml-1 ${
                    project.permissions.read ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  Read
                </span>
              </div>

              <div className="flex items-center">
                <LucideReact.Edit3
                  size={16}
                  className={
                    project.permissions.write
                      ? "text-blue-500"
                      : "text-gray-300"
                  }
                />
                <span
                  className={`ml-1 ${
                    project.permissions.write
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                >
                  Write
                </span>
              </div>

              <div className="flex items-center">
                <LucideReact.Shield
                  size={16}
                  className={
                    project.permissions.admin ? "text-red-500" : "text-gray-300"
                  }
                />
                <span
                  className={`ml-1 ${
                    project.permissions.admin
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                >
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import LucideReact from "lucide-react";
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
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No projects available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {value.map((project) => (
        <div
          key={project.node_id}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                {project.name}
                {project.private && (
                  <LucideReact.Lock className="text-gray-500" size={20} />
                )}
              </h3>
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                {project.body ?? "No description provided."}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  project.state === "open"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {project.state.charAt(0).toUpperCase() + project.state.slice(1)}
              </span>
              <span className="text-sm text-gray-500">#{project.number}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-500 text-sm gap-2">
            <div className="flex items-center gap-2">
              <LucideReact.User size={16} />
              <span>{project.creator.name ?? project.creator.login}</span>
            </div>
            <div className="flex items-center gap-2">
              <LucideReact.Calendar size={16} />
              <span>Created {formatDate(project.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <LucideReact.RefreshCw size={16} className="rotate-180" />
              <span>Updated {formatDate(project.updated_at)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

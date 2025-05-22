import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    private?: boolean;
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
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="w-full py-10 flex flex-col items-center text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No projects available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {value.map((project) => {
        const isOpen = project.state === "open";
        const creator = project.creator;
        const avatarFallback = creator
          ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
              creator.login,
            )}&background=random`
          : "";

        return (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {project.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    #{project.number}
                  </span>
                </div>
                <div className="flex items-center">
                  {isOpen ? (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500"
                      aria-label="Open"
                    />
                  ) : (
                    <LucideReact.XCircle
                      size={16}
                      className="text-red-500"
                      aria-label="Closed"
                    />
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {project.body ?? "No description provided."}
              </p>

              <div className="mt-4 flex items-center text-xs text-gray-500 space-x-4">
                <div className="flex items-center">
                  <LucideReact.Calendar size={14} className="mr-1" />
                  <span>Created {formatDate(project.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Calendar size={14} className="mr-1" />
                  <span>Updated {formatDate(project.updated_at)}</span>
                </div>
              </div>
            </div>

            <div className="border-t px-4 py-3 bg-gray-50 flex items-center justify-between">
              {creator ? (
                <div className="flex items-center">
                  <img
                    src={creator.avatar_url}
                    alt={`${creator.login} avatar`}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        avatarFallback;
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700 truncate">
                    {creator.login}
                  </span>
                </div>
              ) : (
                <div className="text-sm text-gray-500">No creator info</div>
              )}
              <div className="flex items-center text-gray-500">
                <LucideReact.Link size={16} className="mr-1" />
                <span className="text-xs truncate max-w-xs">
                  {project.html_url}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
}

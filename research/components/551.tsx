import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A team's access to a project.
     *
     * @title Team Project
    */
    export interface team_project {
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
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.team_project[];



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Date formatting options
  const dateOpts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

  // Helper to format ISO date strings
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, dateOpts);

  // Render when no projects
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} aria-hidden="true" />
        <p className="mt-2">No projects available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-lg shadow hover:shadow-md transition p-5 flex flex-col md:flex-row md:justify-between"
        >
          {/* Left section: title and description */}
          <div className="md:flex-1">
            <div className="flex items-center">
              <img
                src={project.creator.avatar_url}
                alt={project.creator.login}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    project.creator.login
                  )}&background=0D8ABC&color=fff`;
                }}
              />
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-gray-800">{project.name}</h2>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center gap-1">
                    <LucideReact.Hash size={14} aria-hidden="true" />
                    <span>#{project.number}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.User size={14} aria-hidden="true" />
                    <span>{project.creator.login}</span>
                  </div>
                </div>
              </div>
            </div>
            {project.body ? (
              <p className="mt-3 text-gray-600 line-clamp-2">{project.body}</p>
            ) : (
              <div className="mt-3 flex items-center text-gray-400">
                <LucideReact.FileText size={16} aria-hidden="true" />
                <span className="ml-1 italic">No description</span>
              </div>
            )}
          </div>

          {/* Right section: metadata */}
          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <LucideReact.Calendar size={16} aria-hidden="true" />
              <span>Created: {formatDate(project.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <LucideReact.Calendar size={16} aria-hidden="true" />
              <span>Updated: {formatDate(project.updated_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">State:</span>
              {project.state === 'open' ? (
                <LucideReact.CheckCircle
                  className="text-green-500"
                  size={16}
                  role="img"
                  aria-label="Open"
                />
              ) : (
                <LucideReact.XCircle
                  className="text-red-500"
                  size={16}
                  role="img"
                  aria-label="Closed"
                />
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium">Permissions:</span>
              <div className="flex items-center gap-2">
                {project.permissions.read ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={14}
                    role="img"
                    aria-label="Read"
                  />
                ) : (
                  <LucideReact.XCircle
                    className="text-red-500"
                    size={14}
                    role="img"
                    aria-label="No Read"
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                {project.permissions.write ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={14}
                    role="img"
                    aria-label="Write"
                  />
                ) : (
                  <LucideReact.XCircle
                    className="text-red-500"
                    size={14}
                    role="img"
                    aria-label="No Write"
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                {project.permissions.admin ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={14}
                    role="img"
                    aria-label="Admin"
                  />
                ) : (
                  <LucideReact.XCircle
                    className="text-red-500"
                    size={14}
                    role="img"
                    aria-label="No Admin"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

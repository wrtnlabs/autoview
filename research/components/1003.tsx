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
  const projects = Array.isArray(value) ? value : [];

  // Format a date string into a short human-readable format
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No projects available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const {
          id,
          name,
          number,
          body,
          state,
          creator,
          created_at,
          organization_permission,
        } = project;
        const createdDate = formatDate(created_at);
        const isPrivate = project["private"] === true;

        return (
          <div
            key={id}
            className="flex flex-col justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <div>
              <div className="flex items-start justify-between">
                <h2
                  className="text-lg font-semibold text-gray-900 truncate"
                  title={name}
                >
                  {name}
                </h2>
                {isPrivate && (
                  <LucideReact.Lock
                    className="text-gray-500"
                    size={16}
                    aria-label="Private project"
                  />
                )}
              </div>

              {/* Project number & state */}
              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="text-gray-600">#{number}</span>
                <div className="flex items-center">
                  {state === "open" ? (
                    <LucideReact.CheckCircle
                      className="text-green-500"
                      size={16}
                    />
                  ) : (
                    <LucideReact.XCircle
                      className="text-red-500"
                      size={16}
                    />
                  )}
                  <span className="ml-1 capitalize text-gray-700">
                    {state}
                  </span>
                </div>
              </div>

              {/* Truncated body/description */}
              {body && (
                <p className="mt-3 text-sm text-gray-700 line-clamp-2">
                  {body}
                </p>
              )}
            </div>

            {/* Footer: creator info, creation date, org permission */}
            <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                {creator ? (
                  <>
                    <img
                      src={creator.avatar_url}
                      alt={creator.login}
                      className="w-6 h-6 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          creator.login
                        )}&background=0D8ABC&color=fff`;
                      }}
                    />
                    <span className="truncate" title={creator.login}>
                      {creator.login}
                    </span>
                  </>
                ) : (
                  <LucideReact.User className="text-gray-400" size={16} />
                )}
              </div>
              <div className="flex items-center gap-2">
                <LucideReact.Calendar className="text-gray-400" size={14} />
                <span title={`Created at ${createdDate}`}>{createdDate}</span>
                {organization_permission && (
                  <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                    {organization_permission}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

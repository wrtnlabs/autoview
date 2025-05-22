import * as LucideReact from "lucide-react";
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
  // Helper to format ISO dates into "Jan 1, 2025" style
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const projects = value;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((proj) => {
        const isPrivate = proj.private ?? false;
        const isOpen = proj.state === "open";
        const creator = proj.creator;
        // Fallback avatar based on login
        const avatarFallback = creator
          ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
              creator.login,
            )}&background=0D8ABC&color=fff`
          : "";

        return (
          <div
            key={proj.id}
            className="flex flex-col bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2
                className="text-lg font-semibold text-gray-800 truncate"
                title={proj.name}
              >
                {proj.name}
              </h2>
              {isPrivate ? (
                <LucideReact.Lock size={18} className="text-gray-500" />
              ) : (
                <LucideReact.Unlock size={18} className="text-green-500" />
              )}
            </div>

            {/* Meta */}
            <div className="mt-1 flex items-center text-sm text-gray-500 space-x-3">
              <span>#{proj.number}</span>
              <div className="flex items-center">
                {isOpen ? (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500 mr-1"
                  />
                ) : (
                  <LucideReact.XCircle
                    size={16}
                    className="text-red-500 mr-1"
                  />
                )}
                <span>{isOpen ? "Open" : "Closed"}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-3">
              {proj.body ? (
                <p className="text-gray-600 text-sm line-clamp-3">
                  {proj.body}
                </p>
              ) : (
                <p className="text-gray-400 italic text-sm">
                  No description provided.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 space-y-2 text-sm text-gray-500">
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="mr-1" />
                <span>Created: {formatDate(proj.created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.RefreshCw size={16} className="mr-1" />
                <span>Updated: {formatDate(proj.updated_at)}</span>
              </div>
              <div className="flex items-center">
                {creator ? (
                  <>
                    <img
                      src={creator.avatar_url}
                      alt={creator.login}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          avatarFallback;
                      }}
                      className="w-6 h-6 rounded-full object-cover mr-1"
                    />
                    <span className="truncate">{creator.login}</span>
                  </>
                ) : (
                  <>
                    <LucideReact.User
                      size={16}
                      className="text-gray-400 mr-1"
                    />
                    <span>Unknown creator</span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

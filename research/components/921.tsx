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
  const projects = value;
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const capitalize = (s: string): string =>
    s.charAt(0).toUpperCase() + s.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects available.</p>
      ) : (
        projects.map((proj) => {
          const privacyLabel = proj.private ? "Private" : "Public";
          const privacyColor = proj.private
            ? "bg-red-100 text-red-800"
            : "bg-green-100 text-green-800";
          const permList =
            Object.entries(proj.permissions)
              .filter(([, v]) => v)
              .map(
                ([k]) => k.charAt(0).toUpperCase() + k.slice(1)
              )
              .join(", ") || "None";

          return (
            <div
              key={proj.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              <div className="px-4 py-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {proj.name}
                </h2>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${privacyColor}`}
                >
                  {privacyLabel}
                </span>
              </div>
              {proj.body && (
                <div className="px-4">
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {proj.body}
                  </p>
                </div>
              )}
              <div className="mt-auto px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>#{proj.number}</span>
                <span className="flex items-center space-x-2">
                  <img
                    src={proj.creator.avatar_url}
                    alt={proj.creator.login}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="truncate">{proj.creator.login}</span>
                </span>
              </div>
              <div className="px-4 pb-4 flex flex-wrap items-center text-xs text-gray-500 space-x-2">
                <span>{capitalize(proj.state)}</span>
                <span>•</span>
                <span>Created {formatDate(proj.created_at)}</span>
                <span>•</span>
                <span>Perms: {permList}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

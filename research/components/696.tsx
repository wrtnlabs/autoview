import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Collaborator
     *
     * @title Collaborator
    */
    export type collaborator = {
        login: string;
        id: number & tags.Type<"int32">;
        email?: string | null;
        name?: string | null;
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
        permissions?: {
            pull: boolean;
            triage?: boolean;
            push: boolean;
            maintain?: boolean;
            admin: boolean;
        };
        role_name: string;
        user_view_type?: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.collaborator[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const hasCollaborators = Array.isArray(value) && value.length > 0;
  const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasCollaborators) {
    return (
      <div className="p-4 text-center text-gray-500">
        No collaborators to display.
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <ul className="space-y-4">
      {value.map((collab) => {
        const name = collab.name?.trim() || collab.login;
        const permissions = collab.permissions
          ? (Object.entries(collab.permissions) as [keyof typeof collab.permissions, boolean][])
              .filter(([_, v]) => v)
              .map(([k]) => capitalize(k))
          : [];

        return (
          <li
            key={`${collab.id}-${collab.login}`}
            className="bg-white p-4 rounded-lg shadow flex space-x-4 items-center"
          >
            <img
              src={collab.avatar_url}
              alt={`${name} avatar`}
              className="w-12 h-12 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {name}
                </h3>
                {collab.site_admin && (
                  <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    Site Admin
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 truncate">{collab.login}</p>
              {collab.email && (
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {collab.email}
                </p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {collab.role_name}
                </span>
                {permissions.map((perm) => (
                  <span
                    key={perm}
                    className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

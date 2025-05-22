import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub organization.
     *
     * @title Organization Simple
    */
    export type organization_simple = {
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        hooks_url: string;
        issues_url: string;
        members_url: string;
        public_members_url: string;
        avatar_url: string;
        description: string | null;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.organization_simple[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. No complex data transformations required for organization_simple entries.
  //    Use provided properties: login, avatar_url, description, url.
  //    Handle null descriptions with a fallback.

  // Handle empty array
  if (value.length === 0) {
    return (
      <p className="text-center text-gray-500">No organizations to display.</p>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {value.map((org) => (
        <div
          key={org.id}
          className="bg-white rounded-lg shadow-md p-4 flex space-x-4"
        >
          <img
            src={org.avatar_url}
            alt={`${org.login} avatar`}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {org.login}
            </h2>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {org.description ?? 'No description available'}
            </p>
            <p className="mt-2 text-sm text-gray-500 truncate">
              {org.url}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

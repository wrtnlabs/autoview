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
  // 1. Data aggregation: count total organizations
  const totalOrgs = value.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">
        Organizations ({totalOrgs})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {value.map((org) => {
          // Provide a fallback if description is missing
          const description = org.description ?? "No description provided";
          return (
            <div
              key={org.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
            >
              <img
                src={org.avatar_url}
                alt={`${org.login} avatar`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <h2 className="mt-3 text-lg font-semibold text-gray-900">
                {org.login}
              </h2>
              <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                {description}
              </p>
              <p className="mt-auto text-xs text-blue-600 truncate">
                {org.url}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

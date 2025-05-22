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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Sort organizations alphabetically by their login name.
  const sortedOrgs = React.useMemo<AutoViewInput>(
    () => [...value].sort((a, b) => a.login.localeCompare(b.login)),
    [value]
  );
  //    Helper to truncate long text gracefully.
  const truncate = (text: string, max = 120): string =>
    text.length > max ? text.slice(0, max) + '…' : text;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements and ensure responsive, mobile-first design.

  // 3. Return the React element.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {sortedOrgs.map((org) => {
        const description = org.description
          ? truncate(org.description)
          : 'No description available';
        return (
          <div
            key={org.node_id}
            className="flex flex-col bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center p-4">
              <img
                src={org.avatar_url}
                alt={`${org.login} avatar`}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
              />
              <h2 className="ml-4 text-lg font-semibold text-gray-800 truncate">
                {org.login}
              </h2>
            </div>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

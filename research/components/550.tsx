import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Team Membership
     *
     * @title Team Membership
    */
    export type team_membership = {
        url: string & tags.Format<"uri">;
        /**
         * The role of the user in the team.
        */
        role: "member" | "maintainer";
        /**
         * The state of the user's membership in the team.
        */
        state: "active" | "pending";
    };
}
export type AutoViewInput = AutoViewInputSubTypes.team_membership;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    - Derive human-readable labels for role and state.
  const roleLabel = value.role.charAt(0).toUpperCase() + value.role.slice(1);
  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);

  //    - Choose badge colors based on role and state.
  const roleBadgeClasses =
    value.role === "maintainer"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";
  const stateBadgeClasses =
    value.state === "active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  //    - Extract host from URL for concise display.
  const urlHost = (() => {
    try {
      return new URL(value.url).host;
    } catch {
      return value.url;
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    - Mobile-first, card-like presentation.
  //    - Truncate long text to prevent overflow.
  //    - Semantic HTML: <dl> for definition list of properties.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="text-center mb-4">
        <div
          className="text-lg font-medium text-gray-900 truncate"
          title={urlHost}
        >
          {urlHost}
        </div>
        <div
          className="text-xs text-gray-500 truncate"
          title={value.url}
        >
          {value.url}
        </div>
      </div>
      <dl className="flex justify-center space-x-2">
        <div>
          <dt className="sr-only">Role</dt>
          <dd
            className={`px-2 py-1 text-xs font-semibold rounded-full ${roleBadgeClasses}`}
          >
            {roleLabel}
          </dd>
        </div>
        <div>
          <dt className="sr-only">State</dt>
          <dd
            className={`px-2 py-1 text-xs font-semibold rounded-full ${stateBadgeClasses}`}
          >
            {stateLabel}
          </dd>
        </div>
      </dl>
    </div>
  );
  // 3. Return the React element.
  //    - All displayed data is filtered, formatted, and styled for clarity and responsiveness.
}

import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Email
   *
   * @title Email
   */
  export type email = {
    email: string & tags.Format<"email">;
    primary: boolean;
    verified: boolean;
    visibility: string | null;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.email[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived and helper functions
  // Sort emails so that primary addresses appear first
  const sortedEmails = [...value].sort(
    (a, b) => (b.primary === true ? 1 : 0) - (a.primary === true ? 1 : 0),
  );

  // Format visibility: null => "Private", otherwise capitalize
  const formatVisibility = (vis: string | null): string =>
    vis ? vis.charAt(0).toUpperCase() + vis.slice(1) : "Private";

  // 2. Handle empty state
  if (sortedEmails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-sm">No email addresses available</span>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <ul className="space-y-2">
      {sortedEmails.map((item) => (
        <li
          key={item.email}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
        >
          {/* Email address */}
          <div className="flex items-center space-x-2 truncate">
            <LucideReact.Mail size={16} className="text-gray-400" />
            <span className="text-gray-800 text-sm truncate">{item.email}</span>
          </div>

          {/* Status indicators */}
          <div className="flex items-center space-x-4">
            {item.primary && (
              <div className="flex items-center text-green-500" title="Primary">
                <LucideReact.CheckCircle size={16} />
              </div>
            )}
            {item.verified && (
              <div className="flex items-center text-blue-500" title="Verified">
                <LucideReact.BadgeCheck size={16} />
              </div>
            )}
            <div className="flex items-center space-x-1 text-gray-500">
              <LucideReact.Eye size={16} />
              <span className="text-xs">
                {formatVisibility(item.visibility)}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

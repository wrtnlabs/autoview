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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount: number = value.length;
  const verifiedCount: number = value.filter((e) => e.verified).length;
  const sortedEmails: AutoViewInput = [...value].sort((a, b) =>
    a.primary === b.primary ? 0 : a.primary ? -1 : 1,
  );
  const capitalize = (s: string): string =>
    s.charAt(0).toUpperCase() + s.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Email Addresses</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2 sm:mt-0">
          <div className="flex items-center">
            <LucideReact.Mail
              size={16}
              className="text-gray-400 mr-1 flex-shrink-0"
            />
            <span>{totalCount}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500 mr-1 flex-shrink-0"
            />
            <span>{verifiedCount} Verified</span>
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {sortedEmails.map((item) => {
          const { email, primary, verified, visibility } = item;
          return (
            <li
              key={email}
              className="flex items-center justify-between p-2 bg-gray-50 rounded overflow-hidden"
            >
              <div className="flex items-center space-x-2 min-w-0">
                <LucideReact.Mail
                  size={16}
                  className="text-gray-400 flex-shrink-0"
                />
                <span className="text-gray-700 truncate">{email}</span>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                {primary && (
                  <LucideReact.Star
                    size={16}
                    className="text-yellow-500"
                    aria-label="Primary"
                  />
                )}
                {verified && (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                    aria-label="Verified"
                  />
                )}
                {visibility && (
                  <div className="flex items-center text-gray-500 text-xs">
                    <LucideReact.Eye size={12} className="mr-1 flex-shrink-0" />
                    <span>{capitalize(visibility)}</span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

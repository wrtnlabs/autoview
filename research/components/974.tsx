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
  const emails = Array.isArray(value) ? value : [];
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm">
        <LucideReact.AlertCircle size={48} className="text-gray-300 mb-4" />
        <p className="text-gray-500 text-sm">No email addresses available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="flex items-center text-gray-900 text-lg font-semibold mb-3">
        <LucideReact.Mail size={20} className="text-gray-600 mr-2" />
        Email Addresses
      </h3>
      <ul className="space-y-2">
        {emails.map((item, idx) => {
          const displayVisibility = item.visibility
            ? capitalize(item.visibility)
            : null;

          return (
            <li
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-3 rounded-md"
            >
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <LucideReact.Mail size={16} className="text-gray-500" />
                <span className="text-gray-800 text-sm truncate">
                  {item.email}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                {item.primary && (
                  <div
                    className="flex items-center text-yellow-500"
                    title="Primary email"
                  >
                    <LucideReact.Star size={16} />
                    <span className="sr-only">Primary</span>
                  </div>
                )}
                {item.verified ? (
                  <div
                    className="flex items-center text-green-500"
                    title="Verified"
                  >
                    <LucideReact.CheckCircle size={16} />
                    <span className="sr-only">Verified</span>
                  </div>
                ) : (
                  <div
                    className="flex items-center text-red-500"
                    title="Unverified"
                  >
                    <LucideReact.XCircle size={16} />
                    <span className="sr-only">Unverified</span>
                  </div>
                )}
                {displayVisibility && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    {displayVisibility}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

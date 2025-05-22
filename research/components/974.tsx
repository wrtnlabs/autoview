import { tags } from "typia";
import React from "react";
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
  const capitalize = (s: string): string =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Addresses</h2>
      {value.length === 0 ? (
        <p className="text-gray-500">No email addresses available.</p>
      ) : (
        <ul className="space-y-3">
          {value.map((item) => (
            <li
              key={item.email}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
            >
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 truncate">{item.email}</p>
              </div>
              <div className="mt-2 sm:mt-0 flex flex-wrap items-center space-x-2">
                {item.primary && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    Primary
                  </span>
                )}
                {item.verified ? (
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Verified
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded">
                    Unverified
                  </span>
                )}
                <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                  {item.visibility ? capitalize(item.visibility) : 'Hidden'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

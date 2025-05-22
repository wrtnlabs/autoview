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
  const totalCount = value.length;
  const verifiedCount = value.filter((e) => e.verified).length;
  // Sort primary emails first
  const sortedEmails = [...value].sort((a, b) =>
    a.primary === b.primary ? 0 : a.primary ? -1 : 1,
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  if (totalCount === 0) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-500">No email addresses available.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Email Addresses
        </h2>
        <p className="text-sm text-gray-500">
          {verifiedCount} of {totalCount} verified
        </p>
      </header>
      <ul className="space-y-3">
        {sortedEmails.map((item, idx) => (
          <li
            key={idx}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              {item.primary && (
                <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                  Primary
                </span>
              )}
              <span className="text-gray-700 font-medium truncate">
                {item.email}
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <span
                className={`flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded ${
                  item.verified
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {item.verified ? 'Verified' : 'Unverified'}
              </span>
              {item.visibility != null && (
                <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded capitalize">
                  {item.visibility}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
  const totalEmails = value.length;
  const verifiedCount = value.filter(item => item.verified).length;
  const sortedEmails = [...value].sort((a, b) => Number(b.primary) - Number(a.primary));
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.

  // 3. Return the React element.
  return (
    <div className="bg-white rounded-lg shadow p-4 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Email Addresses</h2>
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded">
          {totalEmails}
        </span>
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-600 mb-4">
        <span>{verifiedCount} verified</span>
        <span className="mx-2">·</span>
        <span>{totalEmails - verifiedCount} unverified</span>
      </div>

      {/* Email List */}
      <ul className="space-y-3">
        {sortedEmails.map((item, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-gray-900 font-medium truncate">{item.email}</p>
              {item.visibility != null && (
                <p className="text-gray-500 text-xs truncate">{capitalize(item.visibility)}</p>
              )}
            </div>
            <div className="flex flex-shrink-0 space-x-2 ml-3">
              {item.primary && (
                <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                  Primary
                </span>
              )}
              {item.verified && (
                <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">
                  Verified
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

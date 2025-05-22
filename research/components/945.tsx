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
  const emailList = Array.isArray(value) ? value : [];
  const totalEmails = emailList.length;
  // Prioritize primary emails at the top for clarity
  const sortedEmails = [...emailList].sort(
    (a, b) => (b.primary ? 1 : 0) - (a.primary ? 1 : 0),
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Email Addresses ({totalEmails})
      </h2>
      <ul className="divide-y divide-gray-200">
        {sortedEmails.map((item, index) => {
          const { email, primary, verified, visibility } = item;
          // Capitalize visibility or mark as Hidden
          const visibilityLabel = visibility
            ? visibility.charAt(0).toUpperCase() + visibility.slice(1)
            : "Hidden";

          return (
            <li
              key={index}
              className={`flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 ${
                primary ? "bg-blue-50" : ""
              }`}
            >
              {/* Email address */}
              <div className="text-gray-800 font-medium break-all">
                {email}
              </div>
              {/* Badges for primary, verified, and visibility */}
              <div className="flex flex-wrap space-x-2 mt-2 sm:mt-0">
                {primary && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Primary
                  </span>
                )}
                {verified && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Verified
                  </span>
                )}
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {visibilityLabel}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

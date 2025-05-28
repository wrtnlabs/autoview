import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Email
     *
     * @title Email
    */
    export interface email {
        email: string & tags.Format<"email">;
        primary: boolean;
        verified: boolean;
        visibility: string | null;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.email[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.length;
  const verifiedCount = value.filter((e) => e.verified).length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" aria-label="No data" />
        <span>No email addresses available</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="mb-4 flex items-center text-gray-600 text-sm">
        <LucideReact.Mail size={16} className="text-gray-400 mr-1" aria-label="Emails" />
        <span>
          {total} email{total > 1 ? "s" : ""}, {verifiedCount} verified
        </span>
      </div>
      <ul className="divide-y divide-gray-200">
        {value.map((item) => (
          <li key={item.email} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2 overflow-hidden">
              <LucideReact.Mail size={16} className="text-gray-400" aria-label="Email" />
              <span className="truncate">{item.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              {item.primary && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Primary
                </span>
              )}
              {item.verified ? (
                <LucideReact.CheckCircle
                  size={16}
                  className="text-green-500"
                  aria-label="Verified"
                />
              ) : (
                <LucideReact.XCircle
                  size={16}
                  className="text-red-500"
                  aria-label="Unverified"
                />
              )}
              {item.visibility && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full truncate">
                  {item.visibility}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  // 3. Return the React element.
}

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
  const totalEmails = value.length;
  const verifiedCount = value.filter((item) => item.verified).length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (totalEmails === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
        <LucideReact.AlertCircle size={48} aria-label="No data" />
        <p className="mt-2 text-sm">No email addresses available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="mb-4 flex flex-wrap items-center text-sm text-gray-600 space-x-4">
        <div>
          Total emails:{" "}
          <span className="font-medium text-gray-800">{totalEmails}</span>
        </div>
        <div>
          Verified:{" "}
          <span className="font-medium text-gray-800">{verifiedCount}</span>
        </div>
      </div>
      {/* Email list */}
      <ul className="divide-y divide-gray-200">
        {value.map((item) => (
          <li
            key={item.email}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <LucideReact.Mail
                className="text-gray-400 shrink-0"
                size={16}
                aria-label="Email icon"
              />
              <span className="text-gray-800 truncate">{item.email}</span>
            </div>
            <div className="flex items-center gap-3">
              {item.verified && (
                <LucideReact.CheckCircle
                  className="text-green-500"
                  size={16}
                  aria-label="Verified"
                  role="img"
                />
              )}
              {item.primary && (
                <LucideReact.Star
                  className="text-yellow-500"
                  size={16}
                  aria-label="Primary"
                  role="img"
                />
              )}
              {item.visibility && (
                <div className="flex items-center gap-1">
                  <LucideReact.Eye
                    className="text-gray-400"
                    size={16}
                    aria-label="Visibility"
                  />
                  <span className="text-gray-600 text-xs capitalize">
                    {item.visibility}
                  </span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

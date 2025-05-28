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
  const hasEmails = value.length > 0;
  const formatVisibility = (vis: string | null): string =>
    vis ? `${vis.charAt(0).toUpperCase()}${vis.slice(1)}` : 'Unknown';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4 text-lg font-semibold text-gray-900">
        <LucideReact.Mail className="mr-2 text-gray-600" size={20} />
        Emails
      </div>

      {!hasEmails ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={48} aria-hidden="true" />
          <p className="mt-2">No emails available</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {value.map((item) => {
            const visibilityLabel = formatVisibility(item.visibility);
            return (
              <li
                key={item.email}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <LucideReact.Mail
                    size={16}
                    className="text-gray-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-gray-800 truncate">{item.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.primary && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      Primary
                    </span>
                  )}
                  <div className="flex items-center">
                    {item.verified ? (
                      <LucideReact.CheckCircle
                        size={16}
                        className="text-green-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <LucideReact.XCircle
                        size={16}
                        className="text-red-500"
                        aria-hidden="true"
                      />
                    )}
                    <span className="sr-only">
                      {item.verified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                    {visibilityLabel}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

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
  const emails = value;

  // Placeholder for empty email list
  if (!emails || emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={24} aria-hidden="true" />
        <span className="mt-2 text-sm">No email addresses available</span>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {emails.map((item) => (
        <li
          key={item.email}
          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-2 overflow-hidden">
            <LucideReact.Mail
              className="text-gray-400 flex-shrink-0"
              size={16}
              aria-hidden="true"
            />
            <span className="text-gray-900 font-medium truncate">{item.email}</span>
          </div>
          <div className="flex items-center space-x-4">
            {item.primary && (
              <span className="flex items-center text-blue-500 text-sm">
                <LucideReact.Star size={16} strokeWidth={1.5} aria-hidden="true" />
                <span className="ml-1">Primary</span>
              </span>
            )}
            {item.verified ? (
              <LucideReact.CheckCircle
                className="text-green-500"
                size={16}
                strokeWidth={1.5}
                aria-label="Verified"
              />
            ) : (
              <LucideReact.XCircle
                className="text-red-500"
                size={16}
                strokeWidth={1.5}
                aria-label="Unverified"
              />
            )}
            {item.visibility && (
              <span className="flex items-center text-gray-500 text-sm capitalize">
                <LucideReact.Eye size={16} strokeWidth={1.5} aria-hidden="true" />
                <span className="ml-1">{item.visibility}</span>
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

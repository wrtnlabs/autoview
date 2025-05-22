import LucideReact from "lucide-react";
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
  const emails = value;
  const totalEmails = emails.length;
  const primaryCount = emails.filter((e) => e.primary).length;
  const verifiedCount = emails.filter((e) => e.verified).length;

  // 2. Handle empty state
  if (totalEmails === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mx-auto mb-2" />
        <p className="text-sm">No email addresses available</p>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Email Addresses
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {totalEmails} {totalEmails === 1 ? "email" : "emails"}
        {primaryCount > 0 && `, ${primaryCount} primary`}
        {verifiedCount > 0 && `, ${verifiedCount} verified`}
      </p>
      <ul className="divide-y divide-gray-200">
        {emails.map((email) => (
          <li
            key={email.email}
            className="py-2 flex items-center justify-between"
          >
            <div className="flex items-center text-gray-900 overflow-hidden">
              <LucideReact.Mail
                className="text-gray-400 flex-shrink-0 mr-2"
                size={16}
                aria-label="Email"
              />
              <span className="truncate">{email.email}</span>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              {email.primary && (
                <LucideReact.Star
                  className="text-amber-500"
                  size={16}
                  aria-label="Primary"
                />
              )}
              {email.verified && (
                <LucideReact.CheckCircle
                  className="text-green-500"
                  size={16}
                  aria-label="Verified"
                />
              )}
              {email.visibility && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {email.visibility}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

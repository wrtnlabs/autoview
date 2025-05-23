import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Social media account
     *
     * @title Social account
    */
    export interface social_account {
        provider: string;
        url: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.social_account[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const validAccounts = value.filter(
    (acc): acc is AutoViewInputSubTypes.social_account =>
      typeof acc.provider === "string" && typeof acc.url === "string"
  );
  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  // 2. Render empty state if no data
  if (validAccounts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} aria-hidden="true" />
        <p className="mt-2 text-sm">No social accounts available.</p>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="mb-3 text-lg font-medium text-gray-900">
        Social Accounts
      </h2>
      <ul className="space-y-2">
        {validAccounts.map((acc, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-md"
          >
            <LucideReact.Link
              size={20}
              className="flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">
                {capitalize(acc.provider)}
              </p>
              <p className="mt-1 text-sm text-blue-600 break-all truncate">
                {acc.url}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

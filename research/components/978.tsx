import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Social media account
   *
   * @title Social account
   */
  export type social_account = {
    provider: string;
    url: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.social_account[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    - Capitalize provider names
  //    - Extract a short domain for URL display
  const formattedAccounts = value.map((account) => {
    const providerName =
      account.provider.charAt(0).toUpperCase() +
      account.provider.slice(1).toLowerCase();
    let domain = account.url;
    try {
      domain = new URL(account.url).hostname;
    } catch {
      // fallback to full URL if parsing fails
    }
    return { ...account, providerName, domain };
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    - Handle empty state
  if (formattedAccounts.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No social accounts available</span>
      </div>
    );
  }

  // 3. Render the list of social accounts
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <LucideReact.Users size={20} className="mr-2 text-gray-600" />
        Social Accounts
      </h2>
      <ul className="space-y-3">
        {formattedAccounts.map((acc, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LucideReact.Link size={16} className="text-gray-400" />
              <span className="font-medium text-gray-700">
                {acc.providerName}
              </span>
            </div>
            <span
              className="text-sm text-gray-600 truncate max-w-xs"
              title={acc.url}
            >
              {acc.domain}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

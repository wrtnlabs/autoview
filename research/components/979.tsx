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
  //    Map each account to a display-friendly object with host portion of URL.
  const accounts = value.map((account) => {
    let host = account.url;
    try {
      host = new URL(account.url).host;
    } catch {
      // leave full URL if parsing fails
    }
    return {
      provider: account.provider.trim(),
      url: account.url,
      host,
    };
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Show placeholder if no accounts are present.
  if (accounts.length === 0) {
    return (
      <div className="flex items-center p-4 bg-white rounded-lg shadow">
        <LucideReact.AlertCircle
          size={24}
          className="text-gray-400 mr-2"
          aria-hidden="true"
        />
        <span className="text-gray-500">No social accounts available.</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <LucideReact.Users
          size={20}
          className="text-gray-600 mr-2"
          aria-hidden="true"
        />
        Social Accounts
      </h2>
      <ul className="divide-y divide-gray-200">
        {accounts.map(({ provider, host, url }) => (
          <li
            key={`${provider}-${url}`}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center gap-2">
              <LucideReact.Link
                size={16}
                className="text-gray-500"
                aria-hidden="true"
              />
              <span className="text-gray-700 font-medium capitalize">
                {provider}
              </span>
            </div>
            <span className="text-blue-600 truncate max-w-xs" title={url}>
              {host}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from "react";
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
  const accounts = Array.isArray(value) ? value : [];

  // Helper to format provider name (capitalize) and display URL without protocol
  const formatProvider = (provider: string) =>
    provider.charAt(0).toUpperCase() + provider.slice(1);
  const formatUrl = (url: string) =>
    url.replace(/^https?:\/\//i, "").replace(/\/$/, "");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (accounts.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No social accounts available.
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <ul className="divide-y divide-gray-200">
        {accounts.map((account, idx) => {
          const displayProvider = formatProvider(account.provider);
          const displayUrl = formatUrl(account.url);
          const avatarInitial = account.provider.charAt(0).toUpperCase();

          return (
            <li key={idx} className="flex items-start space-x-4 py-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 uppercase font-medium">
                {avatarInitial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {displayProvider}
                </p>
                <p className="mt-1 text-sm text-gray-500 truncate break-all">
                  {displayUrl}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

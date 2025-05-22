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

  // Helper: capitalize provider names
  const formatProvider = (provider: string): string =>
    provider.charAt(0).toUpperCase() + provider.slice(1).toLowerCase();

  // Helper: extract and truncate hostnames
  const extractHost = (urlString: string): string => {
    try {
      const host = new URL(urlString).hostname;
      return host.length > 30 ? `${host.slice(0, 30)}…` : host;
    } catch {
      return urlString.length > 30 ? `${urlString.slice(0, 30)}…` : urlString;
    }
  };

  // 3. Return the React element.
  if (accounts.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-500">No social accounts available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800">Social Accounts</h2>
      <ul className="mt-4 space-y-3">
        {accounts.map((account, index) => {
          const providerName = formatProvider(account.provider);
          const hostDisplay = extractHost(account.url);
          return (
            <li key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">{providerName.charAt(0)}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{providerName}</p>
                <p className="text-sm text-gray-500 truncate">{hostDisplay}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

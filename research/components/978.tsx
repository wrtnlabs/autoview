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

  // Mapping common providers to icons/emojis
  const providerIcons: Record<string, string> = {
    twitter: "🐦",
    facebook: "📘",
    instagram: "📸",
    linkedin: "🔗",
    github: "🐙",
  };

  // Helper to extract hostname safely
  function extractDomain(url: string): string {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (accounts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 italic">
        No social accounts available.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      {accounts.map((acct, idx) => {
        const providerKey = acct.provider.toLowerCase();
        const icon = providerIcons[providerKey] || "🔗";
        const displayName =
          acct.provider.charAt(0).toUpperCase() + acct.provider.slice(1);
        const domain = extractDomain(acct.url);

        return (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center mb-2 sm:mb-0">
              <span className="text-2xl mr-3">{icon}</span>
              <span className="font-semibold text-gray-900 capitalize">
                {displayName}
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-mono text-gray-700 truncate">{domain}</span>
              <span className="text-gray-500 text-sm truncate">{acct.url}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

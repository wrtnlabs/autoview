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
  // 1. Data transformation
  const accounts: AutoViewInputSubTypes.social_account[] = Array.isArray(value) ? value : [];
  const sortedAccounts = [...accounts].sort((a, b) =>
    a.provider.localeCompare(b.provider)
  );

  // 2. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {sortedAccounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={24} className="mb-2" />
          <span>No social accounts available</span>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-200">
          {sortedAccounts.map((account, idx) => {
            const { provider, url } = account;
            let domain = url;
            try {
              domain = new URL(url).hostname;
            } catch {
              // leave domain as raw URL if parsing fails
            }
            const displayName = provider.trim()
              ? provider.charAt(0).toUpperCase() + provider.slice(1)
              : 'Account';
            return (
              <li key={idx} className="flex items-center py-3">
                <div className="flex items-center gap-2 w-1/3 text-gray-700">
                  <LucideReact.Link size={18} className="text-gray-400" strokeWidth={1.5} aria-label="Link icon" />
                  <span className="font-medium truncate">{displayName}</span>
                </div>
                <div className="flex-1 text-blue-600 truncate" title={url}>
                  {domain}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

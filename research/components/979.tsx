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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const accounts = value;
  const totalAccounts = accounts.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Social Accounts</h2>
        <span className="text-sm text-gray-500">
          {totalAccounts} {totalAccounts === 1 ? "account" : "accounts"}
        </span>
      </div>

      {totalAccounts === 0 ? (
        <div className="flex flex-col items-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={32} className="mb-2" />
          <span>No social accounts available</span>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {accounts.map((account, idx) => (
            <li key={idx} className="py-3 flex items-center space-x-3">
              <LucideReact.Link size={20} className="text-blue-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {account.provider}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {account.url}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

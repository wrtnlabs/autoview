import LucideReact from "lucide-react";
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
  const accountCount = value.length;
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3 text-lg font-semibold text-gray-800">
        <LucideReact.Link size={20} className="text-blue-500 mr-2" />
        Social Accounts ({accountCount})
      </div>
      {accountCount === 0 ? (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          No social accounts available.
        </div>
      ) : (
        <ul className="space-y-3">
          {value.map((acct, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <div className="mt-1">
                <LucideReact.Link size={16} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800">
                  {capitalize(acct.provider)}
                </p>
                <p className="text-sm text-blue-600 truncate">{acct.url}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
